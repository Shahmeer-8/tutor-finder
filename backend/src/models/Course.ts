import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICourse extends Document {
  _id: Types.ObjectId;
  tutorId: Types.ObjectId;
  title: string;
  subject: string;
  level: string;
  description: string;
  fee: number;
  mode: "online" | "home" | "both";
  duration: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    tutorId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    level: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    fee: { type: Number, required: true, min: 0 },
    mode: { type: String, enum: ["online", "home", "both"], required: true },
    duration: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CourseSchema.index({ tutorId: 1, subject: 1 });
CourseSchema.index({ tutorId: 1, level: 1 });

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
