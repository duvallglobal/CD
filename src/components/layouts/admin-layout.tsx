import { useAuth } from "@/lib/auth/auth-context";
import { ProtectedRoute } from "@/lib/auth/protected-route";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { logout } = useAuth();

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <nav className="flex items-center gap-6">
              <Link href="/protected/admin/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>
        <main className="flex-1 container mx-auto p-6">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 text-center text-gray-600">
          <div className="container mx-auto">
            Admin Portal &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
