"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
export default function Page() {
  return <ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>;
}
