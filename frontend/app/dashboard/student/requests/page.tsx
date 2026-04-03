"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import MyRequests from "@/pages/dashboard/student/MyRequests";
export default function Page() {
  return <ProtectedRoute roles={["student"]}><MyRequests /></ProtectedRoute>;
}
