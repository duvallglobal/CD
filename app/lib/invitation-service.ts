import { createObject, queryObjects, updateObject, getObjectById } from './db';
import { Invitation, InvitationStatus, CreateInvitationInput } from '../models/invitation';
import { User, UserRole, UserStatus } from '../models/user';
import { generateToken } from './utils';
import { sendInvitationEmail } from './email-service';

const INVITATION_CLASS = 'Invitation';
const USER_CLASS = 'User';
const INVITATION_EXPIRY_DAYS = 7;

// Create a new invitation and send email
export async function createInvitation(
  input: CreateInvitationInput,
  adminId: string
): Promise<Invitation> {
  // Check if user with this email already exists
  const existingUsers = await queryObjects<User>(USER_CLASS, { email: input.email });
  if (existingUsers.length > 0) {
    throw new Error('User with this email already exists');
  }
  
  // Check if there's already a pending invitation for this email
  const existingInvitations = await queryObjects<Invitation>(
    INVITATION_CLASS, 
    { 
      email: input.email,
      status: InvitationStatus.PENDING
    }
  );
  
  // If there's an existing invitation, update it with a new token and expiry
  if (existingInvitations.length > 0) {
    const existingInvitation = existingInvitations[0];
    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRY_DAYS);
    
    const updatedInvitation = await updateObject<Invitation>(
      INVITATION_CLASS,
      existingInvitation.id!,
      {
        token,
        expiresAt,
        status: InvitationStatus.PENDING
      }
    );
    
    if (updatedInvitation) {
      await sendInvitationEmail(updatedInvitation);
      return updatedInvitation;
    }
    
    throw new Error('Failed to update invitation');
  }
  
  // Create a new invitation
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRY_DAYS);
  
  const invitation = await createObject<Invitation>(INVITATION_CLASS, {
    email: input.email,
    token,
    role: input.role || UserRole.CLIENT,
    status: InvitationStatus.PENDING,
    expiresAt,
    createdBy: adminId,
    createdAt: new Date()
  });
  
  // Send invitation email
  await sendInvitationEmail(invitation);
  
  return invitation;
}

// Get invitation by token
export async function getInvitationByToken(token: string): Promise<Invitation | null> {
  const invitations = await queryObjects<Invitation>(INVITATION_CLASS, { token });
  return invitations.length > 0 ? invitations[0] : null;
}

// Accept invitation and create user
export async function acceptInvitation(
  token: string,
  name: string,
  password: string
): Promise<User> {
  // Find invitation by token
  const invitation = await getInvitationByToken(token);
  
  if (!invitation) {
    throw new Error('Invalid invitation token');
  }
  
  // Check if invitation is expired
  if (invitation.status !== InvitationStatus.PENDING) {
    throw new Error('Invitation has already been used or expired');
  }
  
  if (invitation.expiresAt < new Date()) {
    // Update invitation status to expired
    await updateObject(INVITATION_CLASS, invitation.id!, {
      status: InvitationStatus.EXPIRED
    });
    throw new Error('Invitation has expired');
  }
  
  // Create new user
  const user = await createObject<User>(USER_CLASS, {
    email: invitation.email,
    name,
    role: invitation.role,
    status: UserStatus.ACTIVE,
    createdAt: new Date()
  });
  
  // Set password (in a real app, this would be hashed)
  // For this example, we're just storing it directly, but in production
  // you would use a proper authentication system
  await updateObject('_User', user.id!, { password });
  
  // Update invitation status to accepted
  await updateObject(INVITATION_CLASS, invitation.id!, {
    status: InvitationStatus.ACCEPTED
  });
  
  return user;
}

// List all invitations with optional filtering
export async function listInvitations(
  status?: InvitationStatus,
  limit: number = 100,
  skip: number = 0
): Promise<Invitation[]> {
  const constraints: Record<string, any> = {};
  
  if (status) {
    constraints.status = status;
  }
  
  return queryObjects<Invitation>(INVITATION_CLASS, constraints, limit, skip);
}

// Resend invitation email
export async function resendInvitation(invitationId: string): Promise<Invitation | null> {
  const invitation = await getObjectById<Invitation>(INVITATION_CLASS, invitationId);
  
  if (!invitation) {
    throw new Error('Invitation not found');
  }
  
  if (invitation.status !== InvitationStatus.PENDING) {
    throw new Error('Can only resend pending invitations');
  }
  
  // Update expiry date
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRY_DAYS);
  
  const updatedInvitation = await updateObject<Invitation>(
    INVITATION_CLASS,
    invitationId,
    { expiresAt }
  );
  
  if (updatedInvitation) {
    await sendInvitationEmail(updatedInvitation);
    return updatedInvitation;
  }
  
  return null;
}
