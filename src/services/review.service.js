const httpStatus = require('http-status');
const reviewRepository = require('../repositories/review.repository');
const { TutorProfile, Request } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Add a review for a tutor
 * @param {Object} reviewBody
 * @returns {Promise<Review>}
 */
const addReview = async (reviewBody) => {
  const { tutor: tutorId, student: studentId, rating } = reviewBody;

  // Validate the tutor exists
  const tutorProfile = await TutorProfile.findOne({ user: tutorId });
  if (!tutorProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tutor not found');
  }

  // Ensure rating is valid
  if (rating < 1 || rating > 5) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Rating must be between 1 and 5');
  }

  // Optional business logic: student can only review if they had a completed/paid request with the tutor
  /* 
  const pastRequest = await Request.findOne({ student: studentId, tutor: tutorId, status: 'completed' });
  if (!pastRequest) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You must have completed a course with this tutor to leave a review');
  }
  */

  // Create the review
  const review = await reviewRepository.createReview(reviewBody);

  // Update Tutor's average rating and review count
  const stats = await reviewRepository.calculateTutorRatingStats(tutorId);
  
  tutorProfile.rating = stats.averageRating;
  tutorProfile.reviewCount = stats.reviewCount;
  await tutorProfile.save();

  return review;
};

/**
 * Get all reviews for a specific tutor
 * @param {ObjectId} tutorId
 * @returns {Promise<Array<Review>>}
 */
const getTutorReviews = async (tutorId) => {
  const tutorProfile = await TutorProfile.findOne({ user: tutorId });
  if (!tutorProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tutor not found');
  }
  
  return reviewRepository.getReviewsByTutor(tutorId);
};

module.exports = {
  addReview,
  getTutorReviews
};
