import CryptoJS from 'crypto-js';

// Generate a secure random token for invitations
export function generateToken(length: number = 32): string {
  const randomBytes = CryptoJS.lib.WordArray.random(length);
  return randomBytes.toString(CryptoJS.enc.Hex);
}

// Format date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get base URL for the application
export function getBaseUrl(): string {
  // In production, this would come from environment variables
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

// Generate invitation URL
export function generateInvitationUrl(token: string): string {
  return `${getBaseUrl()}/onboarding?token=${encodeURIComponent(token)}`;
}

// Check if user is admin
export function isAdmin(role?: string): boolean {
  return role === 'admin';
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
