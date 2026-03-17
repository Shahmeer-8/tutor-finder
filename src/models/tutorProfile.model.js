const mongoose = require("mongoose");

const tutorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    documents: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        type: { type: String }, // e.g., ID, degree, certificate
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected", "blocked"],
      default: "pending",
    },
    cities: [
      {
        type: String,
        trim: true,
      },
    ],
    subjects: [
      {
        type: String,
        trim: true,
      },
    ],
    bio: {
      type: String,
      trim: true,
    },
    education: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number, // Years of experience
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for search and relationships
tutorProfileSchema.index({ user: 1 });
tutorProfileSchema.index({ verificationStatus: 1 });
tutorProfileSchema.index({ cities: 1 });
tutorProfileSchema.index({ subjects: 1 });

const TutorProfile = mongoose.model("TutorProfile", tutorProfileSchema);

module.exports = TutorProfile;
