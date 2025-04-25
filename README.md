# Client Dashboard

A comprehensive client dashboard application built with Next.js, TypeScript, Tailwind CSS, and Parse Server.

## Features

- User authentication (login, register)
- Dashboard with client metrics
- Profile management
- Responsive design with dark mode support
- Parse Server integration for backend

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Parse Server
- **Authentication**: Parse User authentication
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/client-dashboard.git
   cd client-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your Parse Server credentials.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm run start
# or
yarn start
```

### Deploy to Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com).

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project to Vercel
3. Add your environment variables
4. Deploy

## Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Dashboard pages
│   ├── profile/            # Profile pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── ui/                 # UI components
│   └── theme-provider.tsx  # Theme provider
├── lib/                    # Utility functions
│   ├── parse.ts            # Parse Server integration
│   └── utils.ts            # Helper functions
├── public/                 # Static assets
└── ...config files
```

## License

This project is licensed under the MIT License.
