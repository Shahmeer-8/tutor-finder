const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const config = require('../config/env');
const logger = require('../config/logger');

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io', // Use a service like Mailtrap for dev
  port: process.env.SMTP_PORT || 2525,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify connection configuration
if (config.env !== 'test') {
  transporter
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Compile Handlebars template
 * @param {string} templateName
 * @param {Object} context
 * @returns {string} compiled html
 */
const compileTemplate = (templateName, context) => {
  const filePath = path.join(__dirname, '../utils/templates', `${templateName}.hbs`);
  const source = fs.readFileSync(filePath, 'utf-8');
  const template = handlebars.compile(source);
  return template(context);
};

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 * @returns {Promise}
 */
const sendEmail = async (to, subject, html) => {
  const msg = { from: process.env.EMAIL_FROM || 'support@tutorfinder.com', to, subject, html };
  await transporter.sendMail(msg);
};

/**
 * Send request approved email
 * @param {string} to
 * @param {Object} data
 */
const sendRequestApprovedEmail = async (to, data) => {
  const subject = 'Your Tutor Request was Approved!';
  const html = compileTemplate('request_approved', data);
  await sendEmail(to, subject, html);
};

/**
 * Send request rejected email
 * @param {string} to
 * @param {Object} data
 */
const sendRequestRejectedEmail = async (to, data) => {
  const subject = 'Update on your Tutor Request';
  const html = compileTemplate('request_rejected', data);
  await sendEmail(to, subject, html);
};

/**
 * Send payment success email
 * @param {string} to
 * @param {Object} data
 */
const sendPaymentSuccessEmail = async (to, data) => {
  const subject = 'Payment Receipt - TutorFinder';
  const html = compileTemplate('payment_success', data);
  await sendEmail(to, subject, html);
};

/**
 * Send tutor verification email
 * @param {string} to
 * @param {Object} data
 */
const sendTutorVerifiedEmail = async (to, data) => {
  const subject = 'Your Profile has been Verified!';
  const html = compileTemplate('tutor_verified', data);
  await sendEmail(to, subject, html);
};

module.exports = {
  transporter,
  sendEmail,
  sendRequestApprovedEmail,
  sendRequestRejectedEmail,
  sendPaymentSuccessEmail,
  sendTutorVerifiedEmail,
};
