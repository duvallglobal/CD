import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key
// In production, use environment variables
const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html, text, from = "notifications@yourdomain.com" } = body;

    // Validate required fields
    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, and either html or text" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend API error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

// Example usage:
// 
// fetch('/api/resend', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     to: 'client@example.com',
//     subject: 'Appointment Confirmation',
//     html: '<p>Your appointment has been confirmed.</p>',
//     text: 'Your appointment has been confirmed.',
//   }),
// });
