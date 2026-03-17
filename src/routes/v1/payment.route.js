const express = require('express');
const auth = require('../../middlewares/auth');
const { paymentController } = require('../../controllers');

const router = express.Router();

// The webhook needs to be placed BEFORE any body parsing middleware,
// but we handled this in app.js by using express.raw() explicitly for this path
router.post('/webhook', paymentController.webhook);

// Student creates a checkout session to pay for a course after trial
router.post('/create-checkout-session', auth('student'), paymentController.createCheckoutSession);

// Tutors (or Admins) can view their earnings and balance
router.get('/earnings/:tutorId?', auth('tutor', 'admin'), paymentController.getTutorEarnings);

// Admins can process a manual withdrawal for a tutor
router.post('/withdraw', auth('admin'), paymentController.processWithdrawal);

module.exports = router;
