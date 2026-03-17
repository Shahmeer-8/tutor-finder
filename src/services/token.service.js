const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/env');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Object>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  if (payload.type !== type) {
    throw new Error('Invalid token type');
  }
  return payload;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, 'access');

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, 'refresh');

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
  // Simple token generation without persisting to DB for now
  // For production, this should be stored in a Token model
  const resetPasswordTokenExpires = moment().add(20, 'minutes');
  const resetPasswordToken = generateToken(email, resetPasswordTokenExpires, 'resetPassword');
  return resetPasswordToken;
};

module.exports = {
  generateToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
};
