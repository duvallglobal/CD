import { NextRequest, NextResponse } from 'next/server';
import { resendInvitation } from '@/app/lib/invitation-service';
import { initializeDB } from '@/app/lib/db';
import { isAdmin } from '@/app/lib/utils';

// Initialize database connection
initializeDB();

// POST /api/invite/[id]/resend - Resend an invitation
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get current user from session (in a real app)
    // For this example, we'll assume the user is an admin
    const currentUser = { id: 'admin-123', role: 'admin' };
    
    // Check if user is admin
    if (!isAdmin(currentUser.role)) {
      return NextResponse.json(
        { error: 'Unauthorized. Only admins can resend invitations.' },
        { status: 403 }
      );
    }
    
    const invitationId = params.id;
    
    // Resend invitation
    const invitation = await resendInvitation(invitationId);
    
    if (!invitation) {
      return NextResponse.json(
        { error: 'Failed to resend invitation' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Invitation resent successfully',
      invitation: {
        id: invitation.id,
        email: invitation.email,
        status: invitation.status,
        expiresAt: invitation.expiresAt
      }
    });
  } catch (error: any) {
    console.error('Error resending invitation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to resend invitation' },
      { status: 500 }
    );
  }
}
