import {
  EmailTemplate,
  sendClientInviteEmail,
  sendOnboardingCompleteEmail,
  sendAppointmentRequestEmail,
  sendDocumentUploadedEmail,
  sendPaymentConfirmedEmail,
} from './resend';

/**
 * Notification event types
 */
export enum NotificationEvent {
  CLIENT_INVITE_SENT = 'client-invite-sent',
  ONBOARDING_COMPLETE = 'onboarding-complete',
  APPOINTMENT_REQUEST_CREATED = 'appointment-request-created',
  DOCUMENT_UPLOADED = 'document-uploaded',
  PAYMENT_CONFIRMED = 'payment-confirmed',
}

/**
 * Notification service class
 */
export class NotificationService {
  /**
   * Send a notification based on an event
   * @param event - The notification event
   * @param data - The event data
   */
  static async sendNotification(event: NotificationEvent, data: any) {
    try {
      switch (event) {
        case NotificationEvent.CLIENT_INVITE_SENT:
          return await sendClientInviteEmail(data);
        
        case NotificationEvent.ONBOARDING_COMPLETE:
          return await sendOnboardingCompleteEmail(data);
        
        case NotificationEvent.APPOINTMENT_REQUEST_CREATED:
          return await sendAppointmentRequestEmail(data);
        
        case NotificationEvent.DOCUMENT_UPLOADED:
          return await sendDocumentUploadedEmail(data);
        
        case NotificationEvent.PAYMENT_CONFIRMED:
          return await sendPaymentConfirmedEmail(data);
        
        default:
          throw new Error(`Unsupported notification event: ${event}`);
      }
    } catch (error) {
      console.error(`Error sending notification for event ${event}:`, error);
      throw error;
    }
  }
}

// Export all from resend
export * from './resend';
