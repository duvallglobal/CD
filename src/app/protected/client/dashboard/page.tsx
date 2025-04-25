"use client";

import { ClientLayout } from "@/components/layouts/client-layout";
import { useAuth } from "@/lib/auth/auth-context";

export default function ClientDashboardPage() {
  const { state } = useAuth();
  
  return (
    <ClientLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Client Dashboard</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome, {state.user?.name}</h2>
          <p className="text-gray-600">
            This is your client dashboard. You can manage your account and view your data here.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">My Profile</h3>
            <p className="text-gray-600">View and update your profile information</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">My Orders</h3>
            <p className="text-gray-600">View your order history</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <p className="text-gray-600">Contact customer support</p>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
