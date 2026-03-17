const httpStatus = require('http-status');
const { TutorProfile, User } = require('../models');
const ApiError = require('../utils/ApiError');
const emailService = require('./email.service');

/**
 * Verify a tutor profile (Admin action)
 * @param {ObjectId} tutorId - The User ID of the tutor
 * @returns {Promise<TutorProfile>}
 */
const verifyTutor = async (tutorId) => {
  const profile = await TutorProfile.findOne({ user: tutorId });
  const user = await User.findById(tutorId);

  if (!profile || !user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tutor not found');
  }

  if (profile.verificationStatus === 'verified') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tutor is already verified');
  }

  // Update profile status
  profile.verificationStatus = 'verified';
  await profile.save();

  // Also update user document if needed
  user.isVerified = true;
  await user.save();

  // Send Email Notification
  emailService.sendTutorVerifiedEmail(user.email, {
    tutorName: user.name,
  }).catch(err => console.error('Failed to send tutor verification email:', err));

  return profile;
};

module.exports = {
  verifyTutor
};
