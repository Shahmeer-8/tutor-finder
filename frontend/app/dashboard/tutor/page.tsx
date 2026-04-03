"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import TutorDashboard from "@/pages/dashboard/tutor/TutorDashboard";
export default function Page() {
  return <ProtectedRoute roles={["tutor"]}><TutorDashboard /></ProtectedRoute>;
}
