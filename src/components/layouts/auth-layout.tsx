import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Authentication Portal</h1>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
      <footer className="bg-gray-100 p-4 text-center text-gray-600">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} - All Rights Reserved
        </div>
      </footer>
    </div>
  );
}
