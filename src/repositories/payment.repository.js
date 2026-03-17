const { Payment } = require('../models');

/**
 * Create a payment record
 * @param {Object} paymentBody
 * @returns {Promise<Payment>}
 */
const createPayment = async (paymentBody) => {
  return Payment.create(paymentBody);
};

/**
 * Get payment by id
 * @param {ObjectId} id
 * @returns {Promise<Payment>}
 */
const getPaymentById = async (id) => {
  return Payment.findById(id).populate('student tutor course');
};

/**
 * Get payment by transaction id (Stripe session id)
 * @param {string} transactionId
 * @returns {Promise<Payment>}
 */
const getPaymentByTransactionId = async (transactionId) => {
  return Payment.findOne({ transactionId });
};

/**
 * Update payment by id
 * @param {ObjectId} paymentId
 * @param {Object} updateBody
 * @returns {Promise<Payment>}
 */
const updatePaymentById = async (paymentId, updateBody) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    return null;
  }
  Object.assign(payment, updateBody);
  await payment.save();
  return payment;
};

/**
 * Get all payments for a tutor
 * @param {ObjectId} tutorId
 * @returns {Promise<Array<Payment>>}
 */
const getPaymentsByTutor = async (tutorId) => {
  return Payment.find({ tutor: tutorId }).populate('student course').sort({ createdAt: -1 });
};

module.exports = {
  createPayment,
  getPaymentById,
  getPaymentByTransactionId,
  updatePaymentById,
  getPaymentsByTutor,
};
