import { Invitation } from '../models/invitation';
import { formatDate, generateInvitationUrl } from './utils';

// In a real application, you would use a proper email service like SendGrid, Mailgun, etc.
// For this example, we'll just log the email content to the console

// Send invitation email
export async function sendInvitationEmail(invitation: Invitation): Promise<void> {
  const inviteUrl = generateInvitationUrl(invitation.token);
  const expiryDate = formatDate(invitation.expiresAt);
  
  const emailSubject = 'You have been invited to join our platform';
  
  const emailBody = `
    Hello,
    
    You have been invited to join our platform. Please click the link below to complete your registration:
    
    ${inviteUrl}
    
    This invitation will expire on ${expiryDate}.
    
    If you have any questions, please contact our support team.
    
    Thank you,
    The Team
  `;
  
  // In a real application, you would send the email using an email service
  // For this example, we'll just log it
  console.log('Sending invitation email:');
  console.log(`To: ${invitation.email}`);
  console.log(`Subject: ${emailSubject}`);
  console.log(`Body: ${emailBody}`);
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('Email sent successfully');
}

// Send welcome email after registration
export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  const emailSubject = 'Welcome to our platform';
  
  const emailBody = `
    Hello ${name},
    
    Welcome to our platform! Your account has been successfully created.
    
    You can now log in and start using our services.
    
    If you have any questions, please contact our support team.
    
    Thank you,
    The Team
  `;
  
  // In a real application, you would send the email using an email service
  // For this example, we'll just log it
  console.log('Sending welcome email:');
  console.log(`To: ${email}`);
  console.log(`Subject: ${emailSubject}`);
  console.log(`Body: ${emailBody}`);
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('Email sent successfully');
}
