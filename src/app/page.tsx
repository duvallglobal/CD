"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { getRedirectPathAfterLogin } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const { state } = useAuth();

  useEffect(() => {
    if (!state.isLoading) {
      if (state.user) {
        // If user is logged in, redirect to appropriate dashboard
        router.push(getRedirectPathAfterLogin(state.user.role));
      } else {
        // If user is not logged in, redirect to login page
        router.push("/auth/login");
      }
    }
  }, [state.isLoading, state.user, router]);

  // Show loading state while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <p>Please wait while we redirect you to the appropriate page.</p>
      </div>
    </div>
  );
}
