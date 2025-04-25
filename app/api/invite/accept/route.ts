import { NextRequest, NextResponse } from 'next/server';
import { acceptInvitation } from '@/app/lib/invitation-service';
import { acceptInvitationSchema } from '@/app/models/invitation';
import { initializeDB } from '@/app/lib/db';
import { sendWelcomeEmail } from '@/app/lib/email-service';

// Initialize database connection
initializeDB();

// POST /api/invite/accept - Accept an invitation and create a user
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validationResult = acceptInvitationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const { token, name, password } = validationResult.data;
    
    // Accept invitation and create user
    const user = await acceptInvitation(token, name, password);
    
    // Send welcome email
    await sendWelcomeEmail(user.email, user.name || '');
    
    // Return user details (without sensitive information)
    return NextResponse.json({
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Error accepting invitation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to accept invitation' },
      { status: 500 }
    );
  }
}
