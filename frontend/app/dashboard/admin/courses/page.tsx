"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AdminCourses from "@/pages/dashboard/admin/AdminCourses";
export default function Page() {
  return <ProtectedRoute roles={["admin"]}><AdminCourses /></ProtectedRoute>;
}
