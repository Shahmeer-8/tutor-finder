const httpStatus = require('http-status');
const { User } = require('../models');
const userRepository = require('../repositories/user.repository');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return userRepository.createUser(userBody);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return userRepository.getUserByEmail(email);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return userRepository.getUserById(id);
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
