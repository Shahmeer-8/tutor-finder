const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { User, Request, Message } = require('../models');

/**
 * Verify socket connection using JWT token
 * @param {Object} socket
 * @param {Function} next
 */
const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    const payload = jwt.verify(token, config.jwt.secret);
    const user = await User.findById(payload.sub);

    if (!user || user.isBlocked) {
      return next(new Error('Authentication error'));
    }

    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
};

/**
 * Validate if a user can send a message to another user
 * Checks for trial status, payment status, and attachment permissions
 * @param {ObjectId} senderId
 * @param {ObjectId} receiverId
 * @param {boolean} hasAttachments
 * @returns {Promise<boolean>}
 */
const canSendMessage = async (senderId, receiverId, hasAttachments = false) => {
  // Find any request between these two users (could be student->tutor or tutor->student)
  const request = await Request.findOne({
    $or: [
      { student: senderId, tutor: receiverId },
      { student: receiverId, tutor: senderId }
    ],
    // Chat is only allowed during trial or after payment (completed/hasPaid)
    status: { $in: ['trial', 'completed'] }
  });

  if (!request) {
    throw new Error('No active request found between users');
  }

  const now = new Date();

  // If in trial phase
  if (request.status === 'trial') {
    if (now > request.trialEndDate) {
      throw new Error('Trial period has expired. Please complete payment to continue chatting.');
    }
    if (hasAttachments) {
      throw new Error('File and image sharing is not allowed during the trial period.');
    }
    return true; // Valid trial text message
  }

  // If completed (trial over) but not paid
  if (request.status === 'completed' && !request.hasPaid) {
    throw new Error('Please complete the payment to continue chatting.');
  }

  // If completed and paid (hasPaid === true)
  if (request.hasPaid) {
    return true; // Full chat enabled, including attachments
  }

  throw new Error('Chat is not permitted at this stage.');
};

/**
 * Save message to database
 * @param {Object} messageData
 * @returns {Promise<Message>}
 */
const saveMessage = async (messageData) => {
  const message = await Message.create(messageData);
  return message.populate('sender', 'name role');
};

/**
 * Mark messages as seen
 * @param {ObjectId} senderId
 * @param {ObjectId} receiverId
 */
const markMessagesAsSeen = async (senderId, receiverId) => {
  await Message.updateMany(
    { sender: senderId, receiver: receiverId, isRead: false },
    { $set: { isRead: true } }
  );
};

module.exports = {
  socketAuthMiddleware,
  canSendMessage,
  saveMessage,
  markMessagesAsSeen
};
