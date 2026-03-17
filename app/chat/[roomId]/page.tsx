'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth, withAuth } from '../../../context/AuthContext';
import { ChatWindow } from '../../../components/chat/ChatWindow';
import { ChatRoom, ChatMessage } from '../../../types/chat';
import { DashboardSidebar } from '../../../components/dashboard/Sidebar';

// Mock Data for demonstration since we don't have the Socket.IO endpoints defined yet
const mockRoom: ChatRoom = {
  _id: 'room_123',
  requestId: 'req_123',
  isPaid: false, // Change this to true to see file upload enabled
  participants: [
    { _id: 'student_1', name: 'Alice Student', role: 'student' },
    { _id: 'tutor_1', name: 'Bob Tutor', role: 'tutor' }
  ]
};

const mockInitialMessages: ChatMessage[] = [
  {
    _id: 'msg_1',
    senderId: 'student_1',
    text: 'Hi Bob, I need help with Calculus.',
    isRead: true,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    _id: 'msg_2',
    senderId: 'tutor_1',
    text: 'Hello Alice! I can definitely help with that. What specific topics?',
    isRead: true,
    createdAt: new Date(Date.now() - 3500000).toISOString()
  }
];

function ChatPage() {
  const params = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(mockInitialMessages);
  const [room, setRoom] = useState<ChatRoom>(mockRoom);
  const [isSending, setIsSending] = useState(false);

  // Setup Socket.IO listener (Mocked)
  useEffect(() => {
    // In a real implementation:
    // const socket = io(process.env.NEXT_PUBLIC_API_URL);
    // socket.emit('joinRoom', params.roomId);
    // socket.on('newMessage', (msg) => setMessages(prev => [...prev, msg]));
    
    // Cleanup
    // return () => socket.disconnect();
  }, [params.roomId]);

  const handleSendMessage = async (text: string, file?: File) => {
    if (!user) return;
    
    setIsSending(true);

    // Mock API delay and file handling
    setTimeout(() => {
      let fileUrl = undefined;
      
      if (file && room.isPaid) {
        // Mock file upload
        fileUrl = URL.createObjectURL(file);
      }

      const newMessage: ChatMessage = {
        _id: `msg_${Date.now()}`,
        senderId: user.id, // Ensure this matches current user ID format
        text,
        fileUrl,
        isRead: false,
        createdAt: new Date().toISOString()
      };

      setMessages(prev => [...prev, newMessage]);
      setIsSending(false);
      
      // In a real implementation:
      // socket.emit('sendMessage', { roomId: params.roomId, text, file: fileData });
    }, 500);
  };

  // Temporarily force the mock data to recognize the current logged-in user
  // This is just to make the UI demonstration work nicely regardless of who logs in
  const effectiveCurrentUserId = user?.role === 'tutor' ? 'tutor_1' : 'student_1';

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* Optional: Reuse sidebar or create a specific chat sidebar */}
      {user && <DashboardSidebar role={user.role as any} />}
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 h-[calc(100vh-4rem)]">
        <div className="max-w-5xl mx-auto h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            
            {/* Toggle mock state button for demonstration purposes */}
            <button 
              onClick={() => setRoom({...room, isPaid: !room.isPaid})}
              className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-gray-700 transition-colors"
            >
              Toggle Demo State: {room.isPaid ? 'Paid' : 'Trial'}
            </button>
          </div>
          
          <div className="flex-1 min-h-0 bg-white shadow-sm border border-gray-200 rounded-xl">
            <ChatWindow 
              room={room}
              messages={messages}
              currentUserId={effectiveCurrentUserId}
              onSendMessage={handleSendMessage}
              isLoading={isSending}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(ChatPage, ['student', 'tutor']);
