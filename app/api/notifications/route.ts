import { NextRequest, NextResponse } from 'next/server';
import { NotificationService, NotificationEvent } from '@/lib/notifications';

/**
 * Send a notification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, data } = body;
    
    // Validate request
    if (!event || !data) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields: event and data are required' 
        },
        { status: 400 }
      );
    }
    
    // Validate event type
    if (!Object.values(NotificationEvent).includes(event as NotificationEvent)) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Invalid event type: ${event}. Valid events are: ${Object.values(NotificationEvent).join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    // Send notification
    const result = await NotificationService.sendNotification(event as NotificationEvent, data);
    
    return NextResponse.json({ 
      success: true, 
      message: `Notification sent successfully for event: ${event}`,
      data: result
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send notification',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
