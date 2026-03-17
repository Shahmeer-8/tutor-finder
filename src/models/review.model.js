const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent a student from reviewing a tutor multiple times for the same course
// or just multiple times generally (depending on business logic).
// We'll add a compound index on student and tutor.
reviewSchema.index({ student: 1, tutor: 1 });
reviewSchema.index({ tutor: 1 });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
