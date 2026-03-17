"use client";

import React, { useState, useEffect } from "react";
import { withAuth } from "../../../context/AuthContext";
import { DashboardSidebar } from "../../../components/dashboard/Sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { adminService } from "../../../services/adminService";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define the shape of our analytics response based on standard admin requirements
interface AdminAnalytics {
  totalUsers: number;
  activeTutors: number;
  totalStudents: number;
  totalRequests: number;
  totalRevenue: number;
  revenueData: { name: string; revenue: number }[];
}

function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Replace with real API call when backend is fully ready
    // adminService.getAnalytics().then(setAnalytics).catch(e => setError(e.message));

    // Mock analytics data for visual representation
    setTimeout(() => {
      setAnalytics({
        totalUsers: 1250,
        activeTutors: 250,
        totalStudents: 1000,
        totalRequests: 840,
        totalRevenue: 24500,
        revenueData: [
          { name: "Jan", revenue: 2000 },
          { name: "Feb", revenue: 2500 },
          { name: "Mar", revenue: 3800 },
          { name: "Apr", revenue: 4200 },
          { name: "May", revenue: 5100 },
          { name: "Jun", revenue: 6900 }, // Trending up
        ],
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
      <DashboardSidebar role="admin" />

      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Platform Analytics
            </h1>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : (
            analytics && (
              <>
                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center text-blue-600 mb-2">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
                          Total Users
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {analytics.totalUsers}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center text-indigo-600 mb-2">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
                          Active Tutors
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {analytics.activeTutors}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center text-orange-600 mb-2">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
                          Total Requests
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {analytics.totalRequests}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center text-green-100 mb-2">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm font-medium uppercase tracking-wider">
                          Total Revenue
                        </span>
                      </div>
                      <div className="text-3xl font-bold">
                        ${analytics.totalRevenue.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Revenue Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-8 pt-4 h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={analytics.revenueData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorRevenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#10B981"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#10B981"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#E5E7EB"
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#6B7280", fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#6B7280", fontSize: 12 }}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                          formatter={(value: any) => [`$${value}`, "Revenue"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#10B981"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
}

// Protect this route, allowing only 'admin' role
export default withAuth(AdminDashboardPage, ["admin"]);
