"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import StudentProfile from "@/pages/dashboard/student/StudentProfile";
export default function Page() {
  return <ProtectedRoute roles={["student"]}><StudentProfile /></ProtectedRoute>;
}
