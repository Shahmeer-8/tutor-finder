const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const config = require('../config/env');

const setTokenCookies = (res, tokens) => {
  const cookieOptions = {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'strict',
  };

  res.cookie('accessToken', tokens.access.token, {
    ...cookieOptions,
    expires: tokens.access.expires,
  });

  res.cookie('refreshToken', tokens.refresh.token, {
    ...cookieOptions,
    expires: tokens.refresh.expires,
  });
};

const signup = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  setTokenCookies(res, tokens);
  res.status(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  setTokenCookies(res, tokens);
  res.send({ user });
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(httpStatus.NO_CONTENT).send();
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  // In a real app, send email here
  res.status(httpStatus.OK).send({ resetPasswordToken, message: 'Password reset token generated (simulated email sent)' });
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
