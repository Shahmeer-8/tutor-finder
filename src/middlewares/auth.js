const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const config = require('../config/env');
const { User } = require('../models');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }

  // Check if user is blocked
  if (user.isBlocked) {
    return reject(new ApiError(httpStatus.FORBIDDEN, 'Your account is blocked'));
  }

  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    // Get token from cookies or authorization header
    let token = req.cookies.accessToken;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }

    try {
      const payload = jwt.verify(token, config.jwt.secret);
      
      User.findById(payload.sub).then(user => {
        if (!user) {
           return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        verifyCallback(req, resolve, reject, requiredRights)(null, user, null);
      }).catch(err => {
         verifyCallback(req, resolve, reject, requiredRights)(err, false, null);
      });

    } catch (err) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
