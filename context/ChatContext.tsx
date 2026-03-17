'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { ChatMessage, ChatRoom } from '../types/chat';

// Assuming socket.io-client will be installed later
// import { io, Socket } from 'socket.io-client';

interface ChatContextType {
  activeRoom: ChatRoom | null;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (text: string, file?: File) => Promise<void>;
  markAsRead: (messageId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // const socketRef = useRef<Socket | null>(null);

  // Initialize Socket connection when user logs in
  /*
  useEffect(() => {
    if (user && !socketRef.current) {
      socketRef.current = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', {
        withCredentials: true
      });

      socketRef.current.on('connect', () => {
        console.log('Socket connected');
      });

      socketRef.current.on('newMessage', (message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
      });

      socketRef.current.on('messageRead', ({ messageId }) => {
        setMessages(prev => prev.map(m => m._id === messageId ? { ...m, isRead: true } : m));
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);
  */

  const joinRoom = useCallback(async (roomId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock fetching room details and history
      // In reality: const { room, history } = await chatService.getRoomDetails(roomId);
      
      // socketRef.current?.emit('joinRoom', roomId);
      
      // Temporary mock
      setActiveRoom({
        _id: roomId,
        requestId: 'req_123',
        isPaid: false,
        participants: [
          { _id: 'student_1', name: 'Alice Student', role: 'student' },
          { _id: 'tutor_1', name: 'Bob Tutor', role: 'tutor' }
        ]
      });
      setMessages([]);
    } catch (err: any) {
      setError(err.message || 'Failed to join room');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const leaveRoom = useCallback((roomId: string) => {
    // socketRef.current?.emit('leaveRoom', roomId);
    setActiveRoom(null);
    setMessages([]);
  }, []);

  const sendMessage = async (text: string, file?: File) => {
    if (!user || !activeRoom) return;
    
    // In reality, if there is a file, you'd upload it first via REST API and get a URL
    // const fileUrl = file ? await uploadService.uploadFile(file) : undefined;
    
    const fileUrl = file && activeRoom.isPaid ? URL.createObjectURL(file) : undefined;

    const newMessage: ChatMessage = {
      _id: `msg_${Date.now()}`,
      senderId: user.id,
      text,
      fileUrl,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    // Optimistic UI update
    setMessages(prev => [...prev, newMessage]);

    // Emit to server
    // socketRef.current?.emit('sendMessage', { roomId: activeRoom._id, message: newMessage });
  };

  const markAsRead = useCallback((messageId: string) => {
    if (!activeRoom) return;
    // socketRef.current?.emit('markAsRead', { roomId: activeRoom._id, messageId });
    setMessages(prev => prev.map(m => m._id === messageId ? { ...m, isRead: true } : m));
  }, [activeRoom]);

  return (
    <ChatContext.Provider
      value={{
        activeRoom,
        messages,
        isLoading,
        error,
        joinRoom,
        leaveRoom,
        sendMessage,
        markAsRead
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
