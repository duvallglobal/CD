import { supabase } from './client';

/**
 * Storage bucket names
 */
export const STORAGE_BUCKETS = {
  DOCUMENTS: 'client-documents',
  MEDIA: 'client-media',
};

/**
 * Initialize storage buckets with proper RLS policies
 * This should be run as a migration or during setup
 */
export async function initializeStorageBuckets() {
  try {
    // Create documents bucket if it doesn't exist
    const { data: docBucket, error: docError } = await supabase
      .storage
      .createBucket(STORAGE_BUCKETS.DOCUMENTS, {
        public: false,
        fileSizeLimit: 10485760, // 10MB
      });
    
    if (docError && docError.message !== 'Bucket already exists') {
      throw docError;
    }
    
    // Create media bucket if it doesn't exist
    const { data: mediaBucket, error: mediaError } = await supabase
      .storage
      .createBucket(STORAGE_BUCKETS.MEDIA, {
        public: false,
        fileSizeLimit: 52428800, // 50MB
      });
    
    if (mediaError && mediaError.message !== 'Bucket already exists') {
      throw mediaError;
    }
    
    console.log('Storage buckets initialized successfully');
    return { docBucket, mediaBucket };
  } catch (error) {
    console.error('Error initializing storage buckets:', error);
    throw error;
  }
}

/**
 * Upload a file to a specific bucket
 * @param bucket - The bucket name
 * @param path - The path within the bucket
 * @param file - The file to upload
 * @param clientId - The client ID for RLS
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
  clientId: string
) {
  try {
    // Ensure path includes client ID for RLS
    const securePath = `${clientId}/${path}`;
    
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .upload(securePath, file, {
        cacheControl: '3600',
        upsert: false,
      });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Get a list of files for a specific client
 * @param bucket - The bucket name
 * @param clientId - The client ID for RLS
 */
export async function getClientFiles(bucket: string, clientId: string) {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .list(clientId);
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error getting client files:', error);
    throw error;
  }
}

/**
 * Get a download URL for a file
 * @param bucket - The bucket name
 * @param path - The path within the bucket
 * @param clientId - The client ID for RLS
 */
export async function getFileUrl(bucket: string, path: string, clientId: string) {
  try {
    // Ensure path includes client ID for RLS
    const securePath = `${clientId}/${path}`;
    
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .createSignedUrl(securePath, 60 * 60); // 1 hour expiry
    
    if (error) throw error;
    
    return data.signedUrl;
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
}

/**
 * Delete a file
 * @param bucket - The bucket name
 * @param path - The path within the bucket
 * @param clientId - The client ID for RLS
 */
export async function deleteFile(bucket: string, path: string, clientId: string) {
  try {
    // Ensure path includes client ID for RLS
    const securePath = `${clientId}/${path}`;
    
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .remove([securePath]);
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}
