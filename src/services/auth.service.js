const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  if (user.isBlocked) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your account has been blocked');
  }
  return user;
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, 'resetPassword');
    const user = await userService.getUserByEmail(resetPasswordTokenDoc.sub); // Assuming sub contains email for reset token
    if (!user) {
      throw new Error();
    }
    // Update password
    await userService.updateUserById(user.id, { password: newPassword });
    // In a real application, you'd invalidate the token here
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  resetPassword,
};
