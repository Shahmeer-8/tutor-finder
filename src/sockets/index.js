const socketIo = require('socket.io');
const { socketAuthMiddleware, canSendMessage, saveMessage, markMessagesAsSeen } = require('./socket.service');
const logger = require('../config/logger');

// Store online users: { userId: socketId }
const onlineUsers = new Map();

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Apply authentication middleware
  io.use(socketAuthMiddleware);

  io.on('connection', (socket) => {
    const userId = socket.user._id.toString();
    onlineUsers.set(userId, socket.id);
    logger.info(`User connected: ${userId}`);

    // Broadcast to others that this user is online
    socket.broadcast.emit('userOnline', { userId });

    socket.on('sendMessage', async (data, callback) => {
      try {
        const { receiverId, content, attachments } = data;
        const senderId = userId;
        const hasAttachments = attachments && attachments.length > 0;

        // 1. Validate if user is allowed to send message (Trial vs Paid logic)
        await canSendMessage(senderId, receiverId, hasAttachments);

        // 2. Save message to DB
        const messageData = {
          sender: senderId,
          receiver: receiverId,
          content,
          attachments: attachments || [],
        };
        const savedMessage = await saveMessage(messageData);

        // 3. Emit to receiver if online
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receiveMessage', savedMessage);
        }

        // 4. Acknowledge success to sender
        if (callback) callback({ success: true, message: savedMessage });
      } catch (error) {
        logger.error(`Socket sendMessage error: ${error.message}`);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    socket.on('markSeen', async (data) => {
      try {
        const { senderId } = data; // The user who originally sent the messages
        const receiverId = userId; // The current user who just read them

        await markMessagesAsSeen(senderId, receiverId);

        // Notify the original sender that their messages were read
        const senderSocketId = onlineUsers.get(senderId);
        if (senderSocketId) {
          io.to(senderSocketId).emit('messagesSeen', { receiverId });
        }
      } catch (error) {
        logger.error(`Socket markSeen error: ${error.message}`);
      }
    });

    socket.on('disconnect', () => {
      onlineUsers.delete(userId);
      logger.info(`User disconnected: ${userId}`);
      socket.broadcast.emit('userOffline', { userId });
    });
  });

  return io;
};

module.exports = initializeSocket;
