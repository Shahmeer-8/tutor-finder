const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const createCheckoutSession = catchAsync(async (req, res) => {
  const { requestId } = req.body;
  const studentId = req.user._id;

  const sessionData = await paymentService.createCheckoutSession(requestId, studentId);
  res.status(httpStatus.OK).send(sessionData);
});

const webhook = catchAsync(async (req, res) => {
  const signature = req.headers['stripe-signature'];
  // Stripe requires the raw body, which we'll handle in the app.js by using express.raw for this route
  const rawBody = req.body; 

  const result = await paymentService.handleWebhook(signature, rawBody);
  res.status(httpStatus.OK).send(result);
});

const getTutorEarnings = catchAsync(async (req, res) => {
  // Can be accessed by the tutor themselves or an admin
  const tutorId = req.params.tutorId || req.user._id;

  if (req.user.role !== 'admin' && req.user._id.toString() !== tutorId.toString()) {
    return res.status(httpStatus.FORBIDDEN).send({ message: 'Forbidden' });
  }

  const earnings = await paymentService.getTutorEarnings(tutorId);
  res.status(httpStatus.OK).send(earnings);
});

const processWithdrawal = catchAsync(async (req, res) => {
  const { tutorId, amount } = req.body;
  
  // Only admins can manually process withdrawals
  const result = await paymentService.processWithdrawal(tutorId, amount);
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createCheckoutSession,
  webhook,
  getTutorEarnings,
  processWithdrawal
};
