"use client";

import React, { useState, useEffect } from "react";
import { useAuth, withAuth } from "../../../context/AuthContext";
import { useRequest } from "../../../context/RequestContext";
import { useToast } from "../../../context/ToastContext";
import { DashboardSidebar } from "../../../components/dashboard/Sidebar";
import { TutorRequest } from "../../../types/request";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { TableSkeleton } from "../../../components/ui/Skeletons";
import { EmptyState } from "../../../components/ui/EmptyState";

function StudentDashboardPage() {
  const { user } = useAuth();
  const {
    requests,
    isLoading,
    error,
    fetchStudentRequests,
    updateRequest,
    deleteRequest,
  } = useRequest();
  const { showToast } = useToast();

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<TutorRequest | null>(
    null,
  );
  const [editMessage, setEditMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchStudentRequests();
  }, [fetchStudentRequests]);

  const handleDelete = async (requestId: string) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;
    try {
      await deleteRequest(requestId);
      showToast("Request deleted successfully", "success");
    } catch (err: any) {
      showToast(err.message || "Failed to delete request", "error");
    }
  };

  const openEditModal = (request: TutorRequest) => {
    setSelectedRequest(request);
    setEditMessage(request.message || "");
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedRequest) return;
    setIsSubmitting(true);
    try {
      await updateRequest(selectedRequest._id, { message: editMessage });
      setIsEditModalOpen(false);
      showToast("Request updated successfully", "success");
    } catch (err: any) {
      showToast(err.message || "Failed to update request", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "approved":
        return <Badge variant="info">Approved</Badge>;
      case "trial":
        return <Badge variant="info">Trial Active</Badge>;
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "rejected":
        return <Badge variant="error">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
      <DashboardSidebar role="student" />

      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.name}
            </h1>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>My Course Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6">
                  <TableSkeleton rows={3} />
                </div>
              ) : requests.length === 0 ? (
                <EmptyState
                  title="No requests yet"
                  description="You haven't made any course requests. Browse our tutors to get started."
                  actionLabel="Find a Tutor"
                  onAction={() => (window.location.href = "/tutors")}
                  className="m-6"
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Tutor</th>
                        <th className="px-6 py-4">Course</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-t border-gray-100 divide-gray-100">
                      {requests.map((req) => (
                        <tr
                          key={req._id}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {req.tutor?.name || "Unknown"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {req.course?.subject || "Unknown"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {req.course?.classOrGrade} • ${req.course?.fee}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(req.status)}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(req.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right space-x-3">
                            {req.status === "pending" && (
                              <>
                                <button
                                  onClick={() => openEditModal(req)}
                                  className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(req._id)}
                                  className="text-red-600 hover:text-red-800 font-medium"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                            {req.status === "trial" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  (window.location.href = `/chat/${req._id}`)
                                }
                              >
                                Go to Chat
                              </Button>
                            )}
                            {req.status === "completed" && !req.hasPaid && (
                              <Button variant="primary" size="sm">
                                Pay Now
                              </Button>
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

      {/* Edit Modal */}
      {isEditModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                Edit Request Message
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                rows={4}
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdate}
                isLoading={isSubmitting}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(StudentDashboardPage, ["student"]);
