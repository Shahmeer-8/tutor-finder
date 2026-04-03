"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import TutorProfilePage from "@/pages/dashboard/tutor/TutorProfile";
export default function Page() {
  return <ProtectedRoute roles={["tutor"]}><TutorProfilePage /></ProtectedRoute>;
}
