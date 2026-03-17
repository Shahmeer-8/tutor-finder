export interface ChatMessage {
  _id: string;
  senderId: string;
  text: string;
  fileUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatRoom {
  _id: string;
  requestId: string;
  participants: {
    _id: string;
    name: string;
    role: string;
  }[];
  isPaid: boolean;
  lastMessage?: ChatMessage;
}
