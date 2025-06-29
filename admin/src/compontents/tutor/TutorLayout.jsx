import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router-dom";  
import TutorSidebar from "./TutorSidebar";

const TutorLayout = ({  }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Toggle for mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-deep text-white rounded"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static`}
      >
        <TutorSidebar onNavItemClick={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto p-4 lg:ml-20">
        <Outlet /> 
      </div>
    </div>
  );
};

export default TutorLayout;
