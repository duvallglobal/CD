import { supabase } from './client';
import fs from 'fs';
import path from 'path';
import { initializeStorageBuckets } from './storage';

/**
 * Run the storage setup script
 * This should be executed during deployment or initial setup
 */
export async function setupStorage() {
  try {
    console.log('Setting up Supabase storage...');
    
    // Initialize storage buckets
    await initializeStorageBuckets();
    
    // Read and execute the SQL migration
    const sqlPath = path.join(process.cwd(), 'lib', 'supabase', 'migrations', 'storage-rls.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the SQL migration
    // Note: This requires admin privileges in Supabase
    const { error } = await supabase.rpc('exec_sql', { sql: sqlContent });
    
    if (error) {
      console.error('Error executing SQL migration:', error);
      throw error;
    }
    
    console.log('Supabase storage setup completed successfully');
  } catch (error) {
    console.error('Error setting up Supabase storage:', error);
    throw error;
  }
}

// If this file is executed directly, run the setup
if (require.main === module) {
  setupStorage()
    .then(() => {
      console.log('Storage setup completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Storage setup failed:', error);
      process.exit(1);
    });
}
