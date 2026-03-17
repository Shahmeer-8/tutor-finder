const { Review } = require('../models');

/**
 * Create a review
 * @param {Object} reviewBody
 * @returns {Promise<Review>}
 */
const createReview = async (reviewBody) => {
  return Review.create(reviewBody);
};

/**
 * Get reviews by tutor id
 * @param {ObjectId} tutorId
 * @returns {Promise<Array<Review>>}
 */
const getReviewsByTutor = async (tutorId) => {
  return Review.find({ tutor: tutorId }).populate('student', 'name').sort({ createdAt: -1 });
};

/**
 * Get a specific review
 * @param {ObjectId} reviewId
 * @returns {Promise<Review>}
 */
const getReviewById = async (reviewId) => {
  return Review.findById(reviewId);
};

/**
 * Calculate average rating for a tutor
 * @param {ObjectId} tutorId
 * @returns {Promise<Object>}
 */
const calculateTutorRatingStats = async (tutorId) => {
  const stats = await Review.aggregate([
    {
      $match: { tutor: tutorId }
    },
    {
      $group: {
        _id: '$tutor',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    return {
      averageRating: Math.round(stats[0].averageRating * 10) / 10, // Round to 1 decimal place
      reviewCount: stats[0].reviewCount
    };
  }
  
  return { averageRating: 0, reviewCount: 0 };
};

module.exports = {
  createReview,
  getReviewsByTutor,
  getReviewById,
  calculateTutorRatingStats
};
