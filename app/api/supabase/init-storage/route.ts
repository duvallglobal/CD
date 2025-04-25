import { NextResponse } from 'next/server';
import { setupStorage } from '@/lib/supabase/setup-storage';

/**
 * Initialize Supabase storage buckets and RLS policies
 * This should be protected and only accessible by admins
 */
export async function POST() {
  try {
    // In a real application, you would add authentication and authorization here
    // to ensure only admins can initialize the storage
    
    await setupStorage();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Storage buckets and RLS policies initialized successfully' 
    });
  } catch (error) {
    console.error('Error initializing storage:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to initialize storage buckets and RLS policies',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
