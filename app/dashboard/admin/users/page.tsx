'use client';

import React, { useState, useEffect } from 'react';
import { withAuth } from '../../../../context/AuthContext';
import { DashboardSidebar } from '../../../../components/dashboard/Sidebar';
import { adminService } from '../../../../services/adminService';
import { User } from '../../../../types/auth';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/Card';
import { Badge } from '../../../../components/ui/Badge';
import { Button } from '../../../../components/ui/Button';

function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'tutor' | 'student'>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchUsers = async (role?: string) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await adminService.getUsers(role === 'all' ? undefined : role);
      setUsers(data.users);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab]);

  const handleToggleBlock = async (user: User) => {
    setProcessingId(user.id);
    const newStatus = !user.isBlocked;
    const actionText = newStatus ? 'block' : 'unblock';
    
    if (!window.confirm(`Are you sure you want to ${actionText} ${user.name}?`)) {
      setProcessingId(null);
      return;
    }

    try {
      const { user: updatedUser } = await adminService.toggleBlockStatus(user.id, newStatus);
      setUsers(users.map(u => u.id === user.id ? { ...u, isBlocked: updatedUser.isBlocked } : u));
    } catch (err: any) {
      alert(`Failed to ${actionText} user: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
      <DashboardSidebar role="admin" />
      
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          </div>

          <Card>
            <CardHeader className="border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
              <CardTitle>Platform Users</CardTitle>
              
              {/* Tabs */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {(['all', 'tutor', 'student'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all capitalize ${
                      activeTab === tab 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}s
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {error && (
                <div className="m-4 p-4 bg-red-50 text-red-700 border-l-4 border-red-500">
                  {error}
                </div>
              )}

              {isLoading ? (
                <div className="p-12 flex justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                </div>
              ) : users.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  No users found for this filter.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-t border-gray-100 divide-gray-100">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {u.name}
                          </td>
                          <td className="px-6 py-4">
                            {u.email}
                          </td>
                          <td className="px-6 py-4 capitalize">
                            <Badge variant={u.role === 'tutor' ? 'info' : 'default'}>
                              {u.role}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            {u.isBlocked ? (
                              <Badge variant="error">Blocked</Badge>
                            ) : (
                              <Badge variant="success">Active</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button 
                              variant={u.isBlocked ? 'outline' : 'danger'} 
                              size="sm"
                              onClick={() => handleToggleBlock(u)}
                              isLoading={processingId === u.id}
                            >
                              {u.isBlocked ? 'Unblock' : 'Block'}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default withAuth(AdminUsersPage, ['admin']);
