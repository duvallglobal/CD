import { NextRequest, NextResponse } from 'next/server';
import { getInvitationByToken } from '@/app/lib/invitation-service';
import { initializeDB } from '@/app/lib/db';
import { InvitationStatus } from '@/app/models/invitation';

// Initialize database connection
initializeDB();

// GET /api/invite/verify?token=xyz - Verify an invitation token
export async function GET(request: NextRequest) {
  try {
    // Get token from query parameters
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }
    
    // Get invitation by token
    const invitation = await getInvitationByToken(token);
    
    if (!invitation) {
      return NextResponse.json(
        { error: 'Invalid invitation token' },
        { status: 404 }
      );
    }
    
    // Check if invitation is expired or already used
    if (invitation.status !== InvitationStatus.PENDING) {
      return NextResponse.json(
        { 
          error: 'Invitation has already been used or expired',
          status: invitation.status
        },
        { status: 400 }
      );
    }
    
    if (invitation.expiresAt < new Date()) {
      return NextResponse.json(
        { 
          error: 'Invitation has expired',
          status: InvitationStatus.EXPIRED
        },
        { status: 400 }
      );
    }
    
    // Return invitation details (without token)
    return NextResponse.json({
      invitation: {
        email: invitation.email,
        expiresAt: invitation.expiresAt,
        status: invitation.status
      },
      valid: true
    });
  } catch (error: any) {
    console.error('Error verifying invitation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify invitation' },
      { status: 500 }
    );
  }
}
