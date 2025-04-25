import { Resend } from 'resend';

// Initialize Resend with API key
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = new Resend(resendApiKey);

// Default sender email
const DEFAULT_FROM_EMAIL = process.env.DEFAULT_FROM_EMAIL || 'notifications@yourdomain.com';

/**
 * Email template types
 */
export enum EmailTemplate {
  CLIENT_INVITE = 'client-invite',
  ONBOARDING_COMPLETE = 'onboarding-complete',
  APPOINTMENT_REQUEST = 'appointment-request',
  DOCUMENT_UPLOADED = 'document-uploaded',
  PAYMENT_CONFIRMED = 'payment-confirmed',
}

/**
 * Base email data interface
 */
interface BaseEmailData {
  to: string;
  from?: string;
  subject?: string;
  replyTo?: string;
}

/**
 * Client invite email data
 */
interface ClientInviteEmailData extends BaseEmailData {
  inviteLink: string;
  inviterName: string;
  companyName: string;
}

/**
 * Onboarding complete email data
 */
interface OnboardingCompleteEmailData extends BaseEmailData {
  clientName: string;
  dashboardLink: string;
  nextSteps?: string[];
}

/**
 * Appointment request email data
 */
interface AppointmentRequestEmailData extends BaseEmailData {
  clientName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  appointmentLocation?: string;
  appointmentLink?: string;
  notes?: string;
}

/**
 * Document uploaded email data
 */
interface DocumentUploadedEmailData extends BaseEmailData {
  clientName: string;
  documentName: string;
  documentType?: string;
  documentLink?: string;
  uploadedBy: string;
}

/**
 * Payment confirmed email data
 */
interface PaymentConfirmedEmailData extends BaseEmailData {
  clientName: string;
  amount: string;
  paymentDate: string;
  paymentMethod: string;
  invoiceNumber?: string;
  invoiceLink?: string;
  receiptLink?: string;
}

/**
 * Send client invite email
 * @param data - Email data
 */
export async function sendClientInviteEmail(data: ClientInviteEmailData) {
  const { to, from = DEFAULT_FROM_EMAIL, inviteLink, inviterName, companyName } = data;
  
  const subject = data.subject || `You've been invited to join ${companyName}`;
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from,
      to,
      subject,
      react: (
        <>
          <h1>You've been invited!</h1>
          <p>Hello,</p>
          <p>{inviterName} has invited you to join {companyName} as a client.</p>
          <p>Click the link below to create your account and get started:</p>
          <a href={inviteLink}>Accept Invitation</a>
          <p>This link will expire in 7 days.</p>
          <p>If you have any questions, please reply to this email.</p>
          <p>Best regards,<br />The {companyName} Team</p>
        </>
      ),
    });
    
    if (error) throw error;
    
    return emailData;
  } catch (error) {
    console.error('Error sending client invite email:', error);
    throw error;
  }
}

/**
 * Send onboarding complete email
 * @param data - Email data
 */
export async function sendOnboardingCompleteEmail(data: OnboardingCompleteEmailData) {
  const { to, from = DEFAULT_FROM_EMAIL, clientName, dashboardLink, nextSteps = [] } = data;
  
  const subject = data.subject || 'Your onboarding is complete!';
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from,
      to,
      subject,
      react: (
        <>
          <h1>Onboarding Complete!</h1>
          <p>Hello {clientName},</p>
          <p>Congratulations! Your onboarding process is now complete.</p>
          <p>You can access your dashboard here:</p>
          <a href={dashboardLink}>Go to Dashboard</a>
          
          {nextSteps.length > 0 && (
            <>
              <p>Here are your next steps:</p>
              <ul>
                {nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </>
          )}
          
          <p>If you have any questions, please don't hesitate to reach out.</p>
          <p>Thank you for choosing our services!</p>
        </>
      ),
    });
    
    if (error) throw error;
    
    return emailData;
  } catch (error) {
    console.error('Error sending onboarding complete email:', error);
    throw error;
  }
}

/**
 * Send appointment request email
 * @param data - Email data
 */
export async function sendAppointmentRequestEmail(data: AppointmentRequestEmailData) {
  const {
    to,
    from = DEFAULT_FROM_EMAIL,
    clientName,
    appointmentDate,
    appointmentTime,
    appointmentType,
    appointmentLocation,
    appointmentLink,
    notes,
  } = data;
  
  const subject = data.subject || 'New Appointment Request';
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from,
      to,
      subject,
      react: (
        <>
          <h1>New Appointment Request</h1>
          <p>Hello,</p>
          <p>A new appointment request has been created by {clientName}.</p>
          <p>Details:</p>
          <ul>
            <li><strong>Date:</strong> {appointmentDate}</li>
            <li><strong>Time:</strong> {appointmentTime}</li>
            <li><strong>Type:</strong> {appointmentType}</li>
            {appointmentLocation && <li><strong>Location:</strong> {appointmentLocation}</li>}
          </ul>
          
          {notes && (
            <>
              <p><strong>Notes:</strong></p>
              <p>{notes}</p>
            </>
          )}
          
          {appointmentLink && (
            <>
              <p>You can manage this appointment here:</p>
              <a href={appointmentLink}>View Appointment</a>
            </>
          )}
          
          <p>Please confirm this appointment at your earliest convenience.</p>
        </>
      ),
    });
    
    if (error) throw error;
    
    return emailData;
  } catch (error) {
    console.error('Error sending appointment request email:', error);
    throw error;
  }
}

/**
 * Send document uploaded email
 * @param data - Email data
 */
export async function sendDocumentUploadedEmail(data: DocumentUploadedEmailData) {
  const {
    to,
    from = DEFAULT_FROM_EMAIL,
    clientName,
    documentName,
    documentType,
    documentLink,
    uploadedBy,
  } = data;
  
  const subject = data.subject || 'New Document Uploaded';
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from,
      to,
      subject,
      react: (
        <>
          <h1>New Document Uploaded</h1>
          <p>Hello {clientName},</p>
          <p>A new document has been uploaded to your account.</p>
          <p>Details:</p>
          <ul>
            <li><strong>Document Name:</strong> {documentName}</li>
            {documentType && <li><strong>Document Type:</strong> {documentType}</li>}
            <li><strong>Uploaded By:</strong> {uploadedBy}</li>
          </ul>
          
          {documentLink && (
            <>
              <p>You can view the document here:</p>
              <a href={documentLink}>View Document</a>
            </>
          )}
          
          <p>If you have any questions about this document, please contact us.</p>
        </>
      ),
    });
    
    if (error) throw error;
    
    return emailData;
  } catch (error) {
    console.error('Error sending document uploaded email:', error);
    throw error;
  }
}

/**
 * Send payment confirmed email
 * @param data - Email data
 */
export async function sendPaymentConfirmedEmail(data: PaymentConfirmedEmailData) {
  const {
    to,
    from = DEFAULT_FROM_EMAIL,
    clientName,
    amount,
    paymentDate,
    paymentMethod,
    invoiceNumber,
    invoiceLink,
    receiptLink,
  } = data;
  
  const subject = data.subject || 'Payment Confirmation';
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from,
      to,
      subject,
      react: (
        <>
          <h1>Payment Confirmation</h1>
          <p>Hello {clientName},</p>
          <p>We're writing to confirm that we've received your payment.</p>
          <p>Details:</p>
          <ul>
            <li><strong>Amount:</strong> {amount}</li>
            <li><strong>Date:</strong> {paymentDate}</li>
            <li><strong>Payment Method:</strong> {paymentMethod}</li>
            {invoiceNumber && <li><strong>Invoice Number:</strong> {invoiceNumber}</li>}
          </ul>
          
          {invoiceLink && (
            <>
              <p>You can view your invoice here:</p>
              <a href={invoiceLink}>View Invoice</a>
            </>
          )}
          
          {receiptLink && (
            <>
              <p>You can download your receipt here:</p>
              <a href={receiptLink}>Download Receipt</a>
            </>
          )}
          
          <p>Thank you for your business!</p>
        </>
      ),
    });
    
    if (error) throw error;
    
    return emailData;
  } catch (error) {
    console.error('Error sending payment confirmed email:', error);
    throw error;
  }
}
