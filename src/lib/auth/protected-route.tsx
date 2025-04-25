import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";
import { isAdmin, isClient } from "../utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "client";
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.isLoading) {
      // If user is not logged in, redirect to login
      if (!state.user) {
        router.push("/auth/login");
        return;
      }

      // If a specific role is required, check if user has that role
      if (requiredRole) {
        const hasRequiredRole = 
          (requiredRole === "admin" && isAdmin(state.user.role)) ||
          (requiredRole === "client" && isClient(state.user.role));

        if (!hasRequiredRole) {
          // Redirect to appropriate dashboard based on actual role
          router.push(
            isAdmin(state.user.role)
              ? "/protected/admin/dashboard"
              : "/protected/client/dashboard"
          );
        }
      }
    }
  }, [state.isLoading, state.user, requiredRole, router]);

  // Show loading state while checking authentication
  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, don't render children
  if (!state.user) {
    return null;
  }

  // If role is required and user doesn't have it, don't render children
  if (requiredRole) {
    const hasRequiredRole = 
      (requiredRole === "admin" && isAdmin(state.user.role)) ||
      (requiredRole === "client" && isClient(state.user.role));

    if (!hasRequiredRole) {
      return null;
    }
  }

  // User is authenticated and has required role, render children
  return <>{children}</>;
}
