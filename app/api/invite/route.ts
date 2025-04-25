import { NextRequest, NextResponse } from 'next/server';
import { createInvitationSchema } from '@/app/models/invitation';
import { createInvitation, listInvitations, resendInvitation } from '@/app/lib/invitation-service';
import { initializeDB } from '@/app/lib/db';
import { isAdmin } from '@/app/lib/utils';

// Initialize database connection
initializeDB();

// POST /api/invite - Create a new invitation
export async function POST(request: NextRequest) {
  try {
    // Get current user from session (in a real app)
    // For this example, we'll assume the user is an admin with ID 'admin-123'
    const currentUser = { id: 'admin-123', role: 'admin' };
    
    // Check if user is admin
    if (!isAdmin(currentUser.role)) {
      return NextResponse.json(
        { error: 'Unauthorized. Only admins can create invitations.' },
        { status: 403 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validationResult = createInvitationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Create invitation
    const invitation = await createInvitation(validationResult.data, currentUser.id);
    
    return NextResponse.json({ 
      message: 'Invitation sent successfully',
      invitation: {
        id: invitation.id,
        email: invitation.email,
        status: invitation.status,
        expiresAt: invitation.expiresAt
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating invitation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create invitation' },
      { status: 500 }
    );
  }
}

// GET /api/invite - List all invitations (admin only)
export async function GET(request: NextRequest) {
  try {
    // Get current user from session (in a real app)
    // For this example, we'll assume the user is an admin
    const currentUser = { id: 'admin-123', role: 'admin' };
    
    // Check if user is admin
    if (!isAdmin(currentUser.role)) {
      return NextResponse.json(
        { error: 'Unauthorized. Only admins can view invitations.' },
        { status: 403 }
      );
    }
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as any;
    const limit = parseInt(searchParams.get('limit') || '100');
    const skip = parseInt(searchParams.get('skip') || '0');
    
    // Get invitations
    const invitations = await listInvitations(status, limit, skip);
    
    // Map invitations to remove sensitive data
    const mappedInvitations = invitations.map(invitation => ({
      id: invitation.id,
      email: invitation.email,
      status: invitation.status,
      expiresAt: invitation.expiresAt,
      createdAt: invitation.createdAt
    }));
    
    return NextResponse.json({ invitations: mappedInvitations });
  } catch (error: any) {
    console.error('Error listing invitations:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to list invitations' },
      { status: 500 }
    );
  }
}
