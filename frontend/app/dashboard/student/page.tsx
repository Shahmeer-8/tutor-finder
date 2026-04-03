"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import StudentDashboard from "@/pages/dashboard/student/StudentDashboard";
export default function Page() {
  return <ProtectedRoute roles={["student"]}><StudentDashboard /></ProtectedRoute>;
}
