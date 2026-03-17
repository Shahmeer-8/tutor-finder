const httpStatus = require("http-status");
const Stripe = require("stripe");
const config = require("../config/env");
const paymentRepository = require("../repositories/payment.repository");
const requestRepository = require("../repositories/request.repository");
const { TutorProfile, Request, User } = require("../models");
const ApiError = require("../utils/ApiError");
const emailService = require("./email.service");

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_replace_in_env",
);

/**
 * Initialize a Stripe checkout session for a course fee
 * @param {ObjectId} requestId
 * @param {ObjectId} studentId
 * @returns {Promise<Object>}
 */
const createCheckoutSession = async (requestId, studentId) => {
  const request = await requestRepository.getRequestById(requestId);

  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, "Request not found");
  }

  if (request.student._id.toString() !== studentId.toString()) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You do not have permission to pay for this request",
    );
  }

  // Ensure request is in a state where payment is allowed (completed trial)
  if (request.status !== "completed" && request.status !== "trial") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Cannot process payment for this request in its current state",
    );
  }

  if (request.hasPaid) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Payment has already been made for this course",
    );
  }

  const courseFee = request.course.fee;

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd", // Could be made dynamic
          product_data: {
            name: `Tutor Course: ${request.course.subject}`,
            description: `Payment for tutor ${request.tutor.name}`,
          },
          unit_amount: courseFee * 100, // Stripe expects amount in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // These URLs would typically come from config/env
    success_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/payment/cancel`,
    metadata: {
      requestId: request._id.toString(),
      studentId: studentId.toString(),
      tutorId: request.tutor._id.toString(),
      courseId: request.course._id.toString(),
      courseFee: courseFee.toString(),
    },
  });

  // Create a pending payment record
  await paymentRepository.createPayment({
    student: studentId,
    tutor: request.tutor._id,
    course: request.course._id,
    amount: courseFee,
    commission: 10, // 10% platform fee
    status: "pending",
    transactionId: session.id,
  });

  return { sessionId: session.id, url: session.url };
};

/**
 * Handle Stripe webhook events
 * @param {string} signature
 * @param {Buffer} rawBody
 */
const handleWebhook = async (signature, rawBody) => {
  let event;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Fulfill the purchase...
    await fulfillOrder(session);
  }

  return { received: true };
};

/**
 * Fulfill the order after successful payment
 * @param {Object} session
 */
const fulfillOrder = async (session) => {
  const transactionId = session.id;
  const payment =
    await paymentRepository.getPaymentByTransactionId(transactionId);

  if (!payment || payment.status === "completed") {
    return; // Already processed or not found
  }

  // 1. Mark payment as completed
  await paymentRepository.updatePaymentById(payment._id, {
    status: "completed",
    paymentMethod: "card", // Based on stripe session
  });

  // 2. Update Request to show payment is complete (Enables full chat features)
  const requestId = session.metadata.requestId;
  await Request.findByIdAndUpdate(requestId, { hasPaid: true });

  // 3. Add net amount to Tutor's balance
  const tutorId = session.metadata.tutorId;
  const tutorProfile = await TutorProfile.findOne({ user: tutorId });

  if (tutorProfile) {
    tutorProfile.balance += payment.netAmount;
    tutorProfile.totalEarnings += payment.netAmount;
    await tutorProfile.save();
  }

  // 4. Send Payment Success Email
  try {
    const student = await User.findById(payment.student);
    const request = await Request.findById(requestId).populate("course tutor");

    if (student && request) {
      await emailService.sendPaymentSuccessEmail(student.email, {
        studentName: student.name,
        courseSubject: request.course.subject,
        amount: payment.amount,
        tutorName: request.tutor.name,
        transactionId: payment.transactionId,
      });
    }
  } catch (err) {
    console.error("Failed to send payment success email:", err);
  }
};

/**
 * Get Tutor Earnings and Balance
 * @param {ObjectId} tutorId
 */
const getTutorEarnings = async (tutorId) => {
  const profile = await TutorProfile.findOne({ user: tutorId });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutor profile not found");
  }

  const payments = await paymentRepository.getPaymentsByTutor(tutorId);

  return {
    balance: profile.balance,
    totalEarnings: profile.totalEarnings,
    recentTransactions: payments.slice(0, 10), // Last 10 payments
  };
};

/**
 * Admin: Manual Withdrawal System
 * Subtracts money from tutor balance
 * @param {ObjectId} tutorId
 * @param {Number} amount
 */
const processWithdrawal = async (tutorId, amount) => {
  const profile = await TutorProfile.findOne({ user: tutorId });

  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Tutor profile not found");
  }

  if (profile.balance < amount) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Insufficient balance for withdrawal",
    );
  }

  profile.balance -= amount;
  await profile.save();

  // In a real application, you might create a "Withdrawal" schema to track these
  // or use Stripe Connect transfers to send money to the tutor's bank account.

  return {
    success: true,
    newBalance: profile.balance,
    withdrawnAmount: amount,
  };
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
  getTutorEarnings,
  processWithdrawal,
};
