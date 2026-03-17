"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth, withAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";
import { ChatWindow } from "../../../components/chat/ChatWindow";
import { DashboardSidebar } from "../../../components/dashboard/Sidebar";

function ChatPage() {
  const params = useParams();
  const { user } = useAuth();
  const {
    activeRoom,
    messages,
    isLoading: isChatLoading,
    error,
    joinRoom,
    leaveRoom,
    sendMessage,
  } = useChat();

  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (params.roomId) {
      joinRoom(params.roomId as string);
    }

    return () => {
      if (params.roomId) {
        leaveRoom(params.roomId as string);
      }
    };
  }, [params.roomId, joinRoom, leaveRoom]);

  const handleSendMessage = async (text: string, file?: File) => {
    setIsSending(true);
    try {
      await sendMessage(text, file);
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setIsSending(false);
    }
  };

  if (isChatLoading && !activeRoom) {
    return (
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
        {user && <DashboardSidebar role={user.role as any} />}
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </main>
      </div>
    );
  }

  if (error || !activeRoom) {
    return (
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
        {user && <DashboardSidebar role={user.role as any} />}
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
          <div className="bg-red-50 text-red-700 p-4 rounded-md shadow-sm">
            {error || "Room not found"}
          </div>
        </main>
      </div>
    );
  }

  // Fallback if role is admin just in case they access it
  const effectiveRole = user?.role === "admin" ? "student" : user?.role;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
      {user && <DashboardSidebar role={effectiveRole as any} />}

      <main className="flex-1 p-4 md:p-6 lg:p-8 h-[calc(100vh-4rem)]">
        <div className="max-w-5xl mx-auto h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          </div>

          <div className="flex-1 min-h-0 bg-white shadow-sm border border-gray-200 rounded-xl">
            <ChatWindow
              room={activeRoom}
              messages={messages}
              currentUserId={user?.id || ""}
              onSendMessage={handleSendMessage}
              isLoading={isSending}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(ChatPage, ["student", "tutor"]);
