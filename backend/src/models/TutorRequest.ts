import mongoose, { Document, Schema, Types } from "mongoose";

export type RequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "trial"
  | "completed";

export interface ITutorRequest extends Document {
  _id: Types.ObjectId;
  studentId: Types.ObjectId;
  tutorId: Types.ObjectId;
  studentName: string;
  tutorName: string;
  tutorAvatarUrl?: string;
  subject: string;
  level: string;
  mode: "online" | "home" | "both";
  message: string;
  status: RequestStatus;
  fee: number;
  scheduledAt?: Date;
  trialStartedAt?: Date;
  trialExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TutorRequestSchema = new Schema<ITutorRequest>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tutorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    studentName: { type: String, required: true },
    tutorName: { type: String, required: true },
    tutorAvatarUrl: { type: String },
    subject: { type: String, required: true },
    level: { type: String, required: true },
    mode: { type: String, enum: ["online", "home", "both"], required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "trial", "completed"],
      default: "pending",
    },
    fee: { type: Number, required: true, min: 0 },
    scheduledAt: { type: Date },
    trialStartedAt: { type: Date },
    trialExpiresAt: { type: Date },
  },
  { timestamps: true },
);

TutorRequestSchema.index({ studentId: 1, status: 1 });
TutorRequestSchema.index({ tutorId: 1, status: 1 });
TutorRequestSchema.index({ createdAt: -1 });

export const TutorRequest = mongoose.model<ITutorRequest>(
  "TutorRequest",
  TutorRequestSchema,
);
