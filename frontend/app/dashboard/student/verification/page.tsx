"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import StudentVerification from "@/pages/dashboard/student/StudentVerification";
export default function Page() {
  return <ProtectedRoute roles={["student"]}><StudentVerification /></ProtectedRoute>;
}
