"use client";

import React, { useState, useEffect } from "react";
import { useAuth, withAuth } from "../../../../context/AuthContext";
import { DashboardSidebar } from "../../../../components/dashboard/Sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/Card";
import { Button } from "../../../../components/ui/Button";
import { StatCardSkeleton } from "../../../../components/ui/Skeletons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock API Call for earnings (since we don't have a specific earnings endpoint in the prompt yet)
const fetchEarningsStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalEarnings: 4500,
        availableBalance: 1200,
        pendingClearance: 300,
        monthlyData: [
          { name: "Jan", earnings: 300 },
          { name: "Feb", earnings: 450 },
          { name: "Mar", earnings: 400 },
          { name: "Apr", earnings: 600 },
          { name: "May", earnings: 550 },
          { name: "Jun", earnings: 800 },
          { name: "Jul", earnings: 1200 },
          { name: "Aug", earnings: 200 }, // Current month partial
        ],
      });
    }, 800);
  });
};

function TutorEarningsPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEarningsStats().then((data) => {
      setStats(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
      <DashboardSidebar role="tutor" />

      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Earnings & Payments
            </h1>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </div>
          ) : (
            <>
              {/* Top Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
                  <CardContent className="p-6">
                    <div className="text-sm font-medium text-blue-100 uppercase tracking-wider">
                      Available Balance
                    </div>
                    <div className="mt-2 text-4xl font-bold">
                      ${stats.availableBalance}
                    </div>
                    <Button className="mt-4 w-full bg-white text-blue-700 hover:bg-blue-50">
                      Withdraw Funds
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Total Earnings
                    </div>
                    <div className="mt-2 text-3xl font-bold text-gray-900">
                      ${stats.totalEarnings}
                    </div>
                    <div className="mt-2 text-sm text-green-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      +12% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Pending Clearance
                    </div>
                    <div className="mt-2 text-3xl font-bold text-gray-900">
                      ${stats.pendingClearance}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Funds from recent sessions clearing soon
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Earnings History</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8 pt-4 h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats.monthlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
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
                        cursor={{ fill: "#F3F4F6" }}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                        formatter={(value) => [`$${value}`, "Earnings"]}
                      />
                      <Bar
                        dataKey="earnings"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={50}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default withAuth(TutorEarningsPage, ["tutor"]);
