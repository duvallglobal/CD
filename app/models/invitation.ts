import { z } from 'zod';
import { UserRole, UserStatus } from './user';

// Invitation status enum
export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  EXPIRED = 'expired',
}

// Invitation schema for validation
export const invitationSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  token: z.string(),
  role: z.nativeEnum(UserRole).default(UserRole.CLIENT),
  status: z.nativeEnum(InvitationStatus).default(InvitationStatus.PENDING),
  expiresAt: z.date(),
  createdAt: z.date().optional(),
  createdBy: z.string().optional(), // Admin user ID who created the invitation
});

// Invitation type derived from schema
export type Invitation = z.infer<typeof invitationSchema>;

// Create invitation input schema
export const createInvitationSchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(UserRole).default(UserRole.CLIENT),
});

export type CreateInvitationInput = z.infer<typeof createInvitationSchema>;

// Accept invitation input schema
export const acceptInvitationSchema = z.object({
  token: z.string(),
  name: z.string().min(2),
  password: z.string().min(8),
});

export type AcceptInvitationInput = z.infer<typeof acceptInvitationSchema>;
