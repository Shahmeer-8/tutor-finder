const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    classOrGrade: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true, // Only required if mode is 'home' or 'both'
    },
    mode: {
      type: String,
      enum: ['online', 'home', 'both'],
      required: true,
    },
    fee: {
      type: Number,
      required: true,
      min: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for search and filtering
courseSchema.index({ tutor: 1 });
courseSchema.index({ subject: 'text', classOrGrade: 'text' });
courseSchema.index({ city: 1 });
courseSchema.index({ mode: 1 });
courseSchema.index({ isDeleted: 1 });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
