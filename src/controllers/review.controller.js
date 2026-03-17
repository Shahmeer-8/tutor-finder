const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { reviewService } = require('../services');

const addReview = catchAsync(async (req, res) => {
  const reviewBody = {
    ...req.body,
    student: req.user._id, // Only authenticated users (students usually) can add a review
  };

  const review = await reviewService.addReview(reviewBody);
  res.status(httpStatus.CREATED).send({ review });
});

const getTutorReviews = catchAsync(async (req, res) => {
  const { tutorId } = req.params;
  const reviews = await reviewService.getTutorReviews(tutorId);
  res.status(httpStatus.OK).send({ reviews });
});

module.exports = {
  addReview,
  getTutorReviews
};
