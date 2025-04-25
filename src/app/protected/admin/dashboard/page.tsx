"use client";

import { AdminLayout } from "@/components/layouts/admin-layout";
import { useAuth } from "@/lib/auth/auth-context";

export default function AdminDashboardPage() {
  const { state } = useAuth();
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome, {state.user?.name}</h2>
          <p className="text-gray-600">
            This is the admin dashboard. You have access to all administrative functions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">User Management</h3>
            <p className="text-gray-600">Manage users and permissions</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Content Management</h3>
            <p className="text-gray-600">Manage website content</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">System Settings</h3>
            <p className="text-gray-600">Configure system settings</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
