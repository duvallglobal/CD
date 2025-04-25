# Client Dashboard

A client dashboard application with Supabase storage and notification features.

## Features

### Supabase Storage with Row-Level Security

The application includes Supabase storage buckets with row-level security (RLS) policies that:

- Allow clients to access only their own uploaded documents and media
- Provide admins with full access to all files
- Enforce security at the database level

### Notification System

A comprehensive notification module using the Resend API that triggers emails for:

- Client invite sent
- Onboarding complete
- Appointment request created
- Document uploaded
- Payment confirmed

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Resend API account

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy the environment variables file and update with your credentials:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

## Setting Up Supabase Storage

1. Create a Supabase project
2. Set up the environment variables in `.env.local`
3. Initialize the storage buckets by making a POST request to `/api/supabase/init-storage`

```bash
curl -X POST http://localhost:3000/api/supabase/init-storage
```

This will:
- Create the necessary storage buckets
- Set up row-level security policies
- Configure triggers for tracking file ownership

## Using the Notification System

Send notifications by making a POST request to `/api/notifications` with the following structure:

```json
{
  "event": "client-invite-sent",
  "data": {
    "to": "client@example.com",
    "inviteLink": "https://yourdomain.com/invite/abc123",
    "inviterName": "Admin User",
    "companyName": "Your Company"
  }
}
```

Available event types:
- `client-invite-sent`
- `onboarding-complete`
- `appointment-request-created`
- `document-uploaded`
- `payment-confirmed`

Each event type requires specific data fields. See the notification module documentation for details.

## Security Considerations

- Always use environment variables for sensitive information
- Implement proper authentication and authorization for API endpoints
- Regularly audit and update security policies

## License

[MIT](LICENSE)
