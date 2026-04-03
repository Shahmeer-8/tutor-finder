import { cloudinary } from "../config/cloudinary.js";
import { logger } from "../lib/logger.js";
import { AppError } from "../utils/errors.js";
import type { UploadApiResponse } from "cloudinary";

interface UploadResult {
  url: string;
  publicId: string;
}

export const uploadService = {
  async uploadAvatar(fileBuffer: Buffer, userId: string): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `tutor-finder/avatars`,
          public_id: `user_${userId}`,
          overwrite: true,
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
            { quality: "auto", fetch_format: "auto" },
          ],
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            logger.error({ error }, "Cloudinary avatar upload failed");
            return reject(new AppError("Failed to upload avatar", 500));
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );
      uploadStream.end(fileBuffer);
    });
  },

  async uploadDocument(
    fileBuffer: Buffer,
    userId: string,
    docType: string
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `tutor-finder/documents/${userId}`,
          public_id: `${docType}_${Date.now()}`,
          resource_type: "auto",
          transformation: [
            { quality: "auto" },
          ],
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            logger.error({ error }, "Cloudinary document upload failed");
            return reject(new AppError("Failed to upload document", 500));
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );
      uploadStream.end(fileBuffer);
    });
  },

  async deleteFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      logger.warn({ err, publicId }, "Failed to delete file from Cloudinary");
    }
  },
};
