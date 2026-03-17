'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  role: 'student' | 'tutor';
}

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const studentLinks = [
    { name: 'My Requests', href: '/dashboard/student', icon: '📝' },
    { name: 'Profile Settings', href: '/dashboard/student/profile', icon: '⚙️' },
  ];

  const tutorLinks = [
    { name: 'Manage Requests', href: '/dashboard/tutor', icon: '📥' },
    { name: 'My Courses', href: '/dashboard/tutor/courses', icon: '📚' },
    { name: 'Earnings', href: '/dashboard/tutor/earnings', icon: '💰' },
    { name: 'Profile Settings', href: '/dashboard/tutor/profile', icon: '⚙️' },
  ];

  const links = role === 'student' ? studentLinks : tutorLinks;

  return (
    <div className="w-full md:w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-4rem)] p-6 shrink-0">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Dashboard</h2>
        <p className="text-sm text-gray-500 capitalize">{role} Portal</p>
      </div>
      
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
