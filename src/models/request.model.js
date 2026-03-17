const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "trial", "completed"],
      default: "pending",
    },
    message: {
      type: String,
      trim: true,
    },
    trialStartDate: {
      type: Date,
    },
    trialEndDate: {
      type: Date,
    },
    hasPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
requestSchema.index({ student: 1 });
requestSchema.index({ tutor: 1 });
requestSchema.index({ course: 1 });
requestSchema.index({ status: 1 });

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
