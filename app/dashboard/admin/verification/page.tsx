"use client";

import React, { useState, useEffect } from "react";
import { withAuth } from "../../../../context/AuthContext";
import { useToast } from "../../../../context/ToastContext";
import { DashboardSidebar } from "../../../../components/dashboard/Sidebar";
import { adminService } from "../../../../services/adminService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/Card";
import { Button } from "../../../../components/ui/Button";
import { CardSkeleton } from "../../../../components/ui/Skeletons";
import { EmptyState } from "../../../../components/ui/EmptyState";

function AdminVerificationPage() {
  const [pendingTutors, setPendingTutors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchPendingVerifications();
  }, []);

  const fetchPendingVerifications = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getPendingVerifications();
      setPendingTutors(data.tutors || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch pending verifications");
      showToast("Failed to load pending verifications", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (tutorId: string) => {
    setProcessingId(tutorId);
    try {
      await adminService.approveTutor(tutorId);
      setPendingTutors(pendingTutors.filter((t) => t.user._id !== tutorId));
      showToast("Tutor application approved", "success");
    } catch (err: any) {
      showToast(`Failed to approve tutor: ${err.message}`, "error");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (tutorId: string) => {
    if (
      !window.confirm("Are you sure you want to reject this tutor application?")
    )
      return;

    setProcessingId(tutorId);
    try {
      await adminService.rejectTutor(tutorId);
      setPendingTutors(pendingTutors.filter((t) => t.user._id !== tutorId));
      showToast("Tutor application rejected", "info");
    } catch (err: any) {
      showToast(`Failed to reject tutor: ${err.message}`, "error");
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
            <h1 className="text-2xl font-bold text-gray-900">
              Tutor Verification
            </h1>
          </div>

          <Card>
            <CardHeader className="border-b border-gray-100 bg-white">
              <CardTitle>Pending Applications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {error && (
                <div className="m-4 p-4 bg-red-50 text-red-700 border-l-4 border-red-500">
                  {error}
                </div>
              )}

              {isLoading ? (
                <div className="p-6 space-y-4">
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              ) : pendingTutors.length === 0 ? (
                <EmptyState
                  title="No pending verifications"
                  description="All caught up! There are no tutor applications waiting for review at this time."
                  className="m-6"
                />
              ) : (
                <div className="divide-y divide-gray-100">
                  {pendingTutors.map((tutor) => (
                    <div
                      key={tutor._id}
                      className="p-6 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl flex-shrink-0">
                              {tutor.user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                {tutor.user?.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {tutor.user?.email}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {tutor.experience || 0} Years Exp
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  {tutor.cities?.join(", ")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                              <span className="font-semibold text-gray-700 block mb-1">
                                Education
                              </span>
                              <span className="text-gray-600">
                                {tutor.education || "Not provided"}
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700 block mb-1">
                                Subjects
                              </span>
                              <span className="text-gray-600">
                                {tutor.subjects?.join(", ") || "None"}
                              </span>
                            </div>
                          </div>

                          {tutor.bio && (
                            <div>
                              <span className="font-semibold text-sm text-gray-700 block mb-1">
                                Bio
                              </span>
                              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                {tutor.bio}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-row md:flex-col gap-3 justify-start md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                          <Button
                            variant="primary"
                            className="w-full"
                            onClick={() => handleApprove(tutor.user._id)}
                            isLoading={processingId === tutor.user._id}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            className="w-full"
                            onClick={() => handleReject(tutor.user._id)}
                            disabled={processingId === tutor.user._id}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default withAuth(AdminVerificationPage, ["admin"]);
