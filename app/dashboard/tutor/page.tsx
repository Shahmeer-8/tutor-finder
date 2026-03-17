'use client';

import React, { useState, useEffect } from 'react';
import { useAuth, withAuth } from '../../../context/AuthContext';
import { DashboardSidebar } from '../../../components/dashboard/Sidebar';
import { requestService } from '../../../services/requestService';
import { TutorRequest } from '../../../types/request';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';

function TutorDashboardPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<TutorRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const data = await requestService.getTutorRequests();
      setRequests(data.requests);
    } catch (err: any) {
      setError(err.message || 'Failed to load incoming requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (requestId: string) => {
    setProcessingId(requestId);
    try {
      const { request } = await requestService.approveRequest(requestId);
      setRequests(requests.map(req => req._id === requestId ? request : req));
    } catch (err: any) {
      alert(err.message || 'Failed to approve request');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (requestId: string) => {
    if (!window.confirm('Are you sure you want to reject this request?')) return;
    setProcessingId(requestId);
    try {
      const { request } = await requestService.rejectRequest(requestId);
      setRequests(requests.map(req => req._id === requestId ? request : req));
    } catch (err: any) {
      alert(err.message || 'Failed to reject request');
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'approved': return <Badge variant="info">Approved</Badge>;
      case 'trial': return <Badge variant="info">Trial Active</Badge>;
      case 'completed': return <Badge variant="success">Completed</Badge>;
      case 'rejected': return <Badge variant="error">Rejected</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  // Quick Stats
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const activeTrialsCount = requests.filter(r => r.status === 'trial').length;
  const completedCount = requests.filter(r => r.status === 'completed' && r.hasPaid).length;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
      <DashboardSidebar role="tutor" />
      
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Tutor Dashboard</h1>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Requests</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">{pendingCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Trials</div>
                <div className="mt-2 text-3xl font-bold text-blue-600">{activeTrialsCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Completed Students</div>
                <div className="mt-2 text-3xl font-bold text-green-600">{completedCount}</div>
              </CardContent>
            </Card>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Incoming Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-8 flex justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                </div>
              ) : requests.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  You don't have any incoming requests right now.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Student</th>
                        <th className="px-6 py-4">Course Details</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Message</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-t border-gray-100 divide-gray-100">
                      {requests.map((req) => (
                        <tr key={req._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{req.student?.name || 'Unknown Student'}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{req.course.subject}</div>
                            <div className="text-xs text-gray-500">{req.course.classOrGrade} • ${req.course.fee}</div>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(req.status)}
                          </td>
                          <td className="px-6 py-4 max-w-xs truncate" title={req.message}>
                            {req.message || <span className="text-gray-400 italic">No message</span>}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            {req.status === 'pending' && (
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleReject(req._id)}
                                  disabled={processingId === req._id}
                                >
                                  Reject
                                </Button>
                                <Button 
                                  variant="primary" 
                                  size="sm"
                                  onClick={() => handleApprove(req._id)}
                                  isLoading={processingId === req._id}
                                >
                                  Approve
                                </Button>
                              </div>
                            )}
                            {req.status === 'trial' && (
                              <Button variant="outline" size="sm">Go to Chat</Button>
                            )}
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

// Protect this route, allowing only 'tutor' role
export default withAuth(TutorDashboardPage, ['tutor']);
