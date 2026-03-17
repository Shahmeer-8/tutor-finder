import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Assuming global CSS contains Tailwind directives
// import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'TutorFinder - Find the Best Tutors Online',
  description: 'Connecting students with expert tutors for personalized, high-quality learning experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        {/* We would wrap this with AuthProvider, QueryClientProvider etc here in a real app */}
        <Navbar />
        
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
