-- Enable Row Level Security for storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create a table to track client-file relationships
CREATE TABLE IF NOT EXISTS public.client_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  bucket_id TEXT NOT NULL,
  object_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(bucket_id, object_path)
);

-- Enable RLS on client_files table
ALTER TABLE public.client_files ENABLE ROW LEVEL SECURITY;

-- Create a function to extract client_id from path
CREATE OR REPLACE FUNCTION public.get_path_client_id(object_path TEXT)
RETURNS TEXT AS $$
DECLARE
  path_parts TEXT[];
BEGIN
  path_parts := string_to_array(object_path, '/');
  RETURN path_parts[1];
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically insert into client_files when a file is uploaded
CREATE OR REPLACE FUNCTION public.handle_storage_object_insert()
RETURNS TRIGGER AS $$
DECLARE
  client_id_from_path UUID;
BEGIN
  -- Extract client_id from the path
  BEGIN
    client_id_from_path := public.get_path_client_id(NEW.name)::UUID;
  EXCEPTION
    WHEN OTHERS THEN
      client_id_from_path := NULL;
  END;
  
  -- Only insert if we have a valid client_id
  IF client_id_from_path IS NOT NULL THEN
    INSERT INTO public.client_files (client_id, bucket_id, object_path)
    VALUES (client_id_from_path, NEW.bucket_id, NEW.name)
    ON CONFLICT (bucket_id, object_path) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on storage.objects
DROP TRIGGER IF EXISTS on_storage_object_insert ON storage.objects;
CREATE TRIGGER on_storage_object_insert
  AFTER INSERT ON storage.objects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_storage_object_insert();

-- Create a trigger to automatically delete from client_files when a file is deleted
CREATE OR REPLACE FUNCTION public.handle_storage_object_delete()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.client_files
  WHERE bucket_id = OLD.bucket_id AND object_path = OLD.name;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on storage.objects
DROP TRIGGER IF EXISTS on_storage_object_delete ON storage.objects;
CREATE TRIGGER on_storage_object_delete
  AFTER DELETE ON storage.objects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_storage_object_delete();

-- RLS Policy: Allow clients to select only their own files
CREATE POLICY client_select_own_files ON public.client_files
  FOR SELECT
  USING (client_id = auth.uid());

-- RLS Policy: Allow clients to insert only their own files
CREATE POLICY client_insert_own_files ON public.client_files
  FOR INSERT
  WITH CHECK (client_id = auth.uid());

-- RLS Policy: Allow clients to delete only their own files
CREATE POLICY client_delete_own_files ON public.client_files
  FOR DELETE
  USING (client_id = auth.uid());

-- RLS Policy: Allow admins to access all files
CREATE POLICY admin_all_access ON public.client_files
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Storage RLS Policies

-- Policy: Allow clients to select only their own files
CREATE POLICY client_select_own_storage_objects ON storage.objects
  FOR SELECT
  USING (
    bucket_id IN ('client-documents', 'client-media')
    AND
    (
      public.get_path_client_id(name)::UUID = auth.uid()
      OR
      EXISTS (
        SELECT 1 FROM public.client_files
        WHERE client_files.bucket_id = bucket_id
        AND client_files.object_path = name
        AND client_files.client_id = auth.uid()
      )
    )
  );

-- Policy: Allow clients to insert only their own files
CREATE POLICY client_insert_own_storage_objects ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id IN ('client-documents', 'client-media')
    AND
    public.get_path_client_id(name)::UUID = auth.uid()
  );

-- Policy: Allow clients to update only their own files
CREATE POLICY client_update_own_storage_objects ON storage.objects
  FOR UPDATE
  USING (
    bucket_id IN ('client-documents', 'client-media')
    AND
    public.get_path_client_id(name)::UUID = auth.uid()
  );

-- Policy: Allow clients to delete only their own files
CREATE POLICY client_delete_own_storage_objects ON storage.objects
  FOR DELETE
  USING (
    bucket_id IN ('client-documents', 'client-media')
    AND
    public.get_path_client_id(name)::UUID = auth.uid()
  );

-- Policy: Allow admins to access all storage objects
CREATE POLICY admin_all_storage_access ON storage.objects
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );
