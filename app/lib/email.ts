/**
 * Utility functions for sending emails using the Resend API
 */

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

/**
 * Send an email using the Resend API
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  from,
}: SendEmailParams): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await fetch('/api/resend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        text,
        from,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to send email',
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Send an appointment confirmation email to a client
 */
export async function sendAppointmentConfirmation(
  clientEmail: string,
  clientName: string,
  appointmentDate: Date,
  appointmentTitle: string
): Promise<{ success: boolean; error?: string }> {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(appointmentDate);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Appointment Confirmation</h2>
      <p>Hello ${clientName},</p>
      <p>Your appointment has been confirmed:</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Title:</strong> ${appointmentTitle}</p>
        <p><strong>Date and Time:</strong> ${formattedDate}</p>
      </div>
      <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
      <p>Thank you,<br>Your Company Name</p>
    </div>
  `;

  const text = `
    Appointment Confirmation
    
    Hello ${clientName},
    
    Your appointment has been confirmed:
    
    Title: ${appointmentTitle}
    Date and Time: ${formattedDate}
    
    If you need to reschedule or cancel, please contact us as soon as possible.
    
    Thank you,
    Your Company Name
  `;

  return sendEmail({
    to: clientEmail,
    subject: 'Appointment Confirmation',
    html,
    text,
  });
}

/**
 * Send a notification email to a client
 */
export async function sendNotification(
  clientEmail: string,
  clientName: string,
  title: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${title}</h2>
      <p>Hello ${clientName},</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p>${message}</p>
      </div>
      <p>Thank you,<br>Your Company Name</p>
    </div>
  `;

  const text = `
    ${title}
    
    Hello ${clientName},
    
    ${message}
    
    Thank you,
    Your Company Name
  `;

  return sendEmail({
    to: clientEmail,
    subject: title,
    html,
    text,
  });
}
