'use client';

import { useState, useEffect } from 'react';
import { Invitation, InvitationStatus } from '@/app/models/invitation';
import { formatDate } from '@/app/lib/utils';

export default function InvitationListPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<InvitationStatus | 'all'>('all');
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchInvitations = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const url = statusFilter === 'all' 
          ? '/api/invite' 
          : `/api/invite?status=${statusFilter}`;
          
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch invitations');
        }
        
        const data = await response.json();
        setInvitations(data.invitations || []);
      } catch (error: any) {
        setError(error.message || 'An error occurred while fetching invitations');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInvitations();
  }, [statusFilter]);
  
  const handleResend = async (id: string) => {
    setResendingId(id);
    setResendSuccess(null);
    setResendError(null);
    
    try {
      const response = await fetch(`/api/invite/${id}/resend`, {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend invitation');
      }
      
      setResendSuccess(`Invitation resent successfully`);
      
      setInvitations(invitations.map(inv => 
        inv.id === id ? { ...inv, expiresAt: data.invitation.expiresAt } : inv
      ));
    } catch (error: any) {
      setResendError(error.message || 'An error occurred while resending the invitation');
    } finally {
      setResendingId(null);
    }
  };
  
  const getStatusBadgeClass = (status: InvitationStatus) => {
    switch (status) {
      case InvitationStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case InvitationStatus.ACCEPTED:
        return 'bg-green-100 text-green-800';
      case InvitationStatus.EXPIRED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Manage Invitations</h1>
      
      {resendSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {resendSuccess}
        </div>
      )}
      
      {resendError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {resendError}
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="statusFilter" className="block text-sm font-medium mb-1">
          Filter by Status
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as InvitationStatus | 'all')}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All</option>
          <option value={InvitationStatus.PENDING}>Pending</option>
          <option value={InvitationStatus.ACCEPTED}>Accepted</option>
          <option value={InvitationStatus.EXPIRED}>Expired</option>
        </select>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : invitations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No invitations found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-left">Email</th>
                <th className="py-2 px-4 border text-left">Status</th>
                <th className="py-2 px-4 border text-left">Expires</th>
                <th className="py-2 px-4 border text-left">Created</th>
                <th className="py-2 px-4 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((invitation) => (
                <tr key={invitation.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{invitation.email}</td>
                  <td className="py-2 px-4 border">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(invitation.status)}`}>
                      {invitation.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    {formatDate(new Date(invitation.expiresAt))}
                  </td>
                  <td className="py-2 px-4 border">
                    {invitation.createdAt ? formatDate(new Date(invitation.createdAt)) : 'N/A'}
                  </td>
                  <td className="py-2 px-4 border">
                    {invitation.status === InvitationStatus.PENDING && (
                      <button
                        onClick={() => handleResend(invitation.id!)}
                        disabled={resendingId === invitation.id}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                      >
                        {resendingId === invitation.id ? 'Resending...' : 'Resend'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
