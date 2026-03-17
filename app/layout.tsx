import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { RequestProvider } from "@/context/RequestContext";
import { ChatProvider } from "@/context/ChatContext";
import { ToastProvider } from "@/context/ToastContext";

// Assuming global CSS contains Tailwind directives
// import '@/app/globals.css';

export const metadata: Metadata = {
  title: "TutorFinder - Find the Best Tutors Online",
  description:
    "Connecting students with expert tutors for personalized, high-quality learning experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        <ToastProvider>
          <AuthProvider>
            <RequestProvider>
              <ChatProvider>
                <Navbar />

                <main className="flex-grow flex flex-col">{children}</main>

                <Footer />
              </ChatProvider>
            </RequestProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
