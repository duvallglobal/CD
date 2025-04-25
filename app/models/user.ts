import { z } from 'zod';

// User role enum
export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
}

// User status enum
export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

// User schema for validation
export const userSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  name: z.string().min(2).optional(),
  role: z.nativeEnum(UserRole).default(UserRole.CLIENT),
  status: z.nativeEnum(UserStatus).default(UserStatus.PENDING),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// User type derived from schema
export type User = z.infer<typeof userSchema>;

// Create user input schema
export const createUserSchema = userSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// Update user input schema
export const updateUserSchema = userSchema.partial().omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// User with password for auth
export const userWithPasswordSchema = userSchema.extend({
  password: z.string().min(8).optional(),
});

export type UserWithPassword = z.infer<typeof userWithPasswordSchema>;
