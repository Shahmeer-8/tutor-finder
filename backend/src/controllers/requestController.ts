import type { Request, Response, NextFunction } from "express";
import { requestRepository } from "../repositories/requestRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import { sendSuccess } from "../utils/response.js";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../utils/errors.js";

export const requestController = {
  async getStudentRequests(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.userId) throw new BadRequestError("User ID required");
      const requests = await requestRepository.findByStudentId(req.userId);
      sendSuccess({ res, data: { requests } });
    } catch (err) {
      next(err);
    }
  },

  async getTutorRequests(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.userId) throw new BadRequestError("User ID required");
      const requests = await requestRepository.findByTutorId(req.userId);
      sendSuccess({ res, data: { requests } });
    } catch (err) {
      next(err);
    }
  },

  async getAllRequests(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Admin only - should add admin middleware check
      const requests = await requestRepository.findAll();
      sendSuccess({ res, data: { requests } });
    } catch (err) {
      next(err);
    }
  },

  async createRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.userId || !req.userRole)
        throw new BadRequestError("User info required");
      if (req.userRole !== "student")
        throw new ForbiddenError("Only students can create requests");

      const { tutorId, subject, level, mode, message, fee, scheduledAt } =
        req.body;

      if (
        !tutorId ||
        !subject ||
        !level ||
        !mode ||
        !message ||
        fee === undefined
      ) {
        throw new BadRequestError("Required fields missing");
      }

      // Get student and tutor info
      const [student, tutor] = await Promise.all([
        userRepository.findById(req.userId),
        userRepository.findById(tutorId as string),
      ]);

      if (!student) throw new NotFoundError("Student not found");
      if (!tutor) throw new NotFoundError("Tutor not found");

      const request = await requestRepository.create({
        studentId: req.userId,
        tutorId: tutorId as string,
        studentName: student.name,
        tutorName: tutor.name,
        tutorAvatarUrl: tutor.avatarUrl,
        subject: subject as string,
        level: level as string,
        mode: mode as "online" | "home" | "both",
        message: message as string,
        fee: Number(fee),
        scheduledAt: scheduledAt ? new Date(scheduledAt as string) : undefined,
      });

      sendSuccess({
        res,
        statusCode: 201,
        message: "Request created",
        data: { request },
      });
    } catch (err) {
      next(err);
    }
  },

  async updateRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.userId) throw new BadRequestError("User ID required");
      const { id } = req.params;
      const { subject, level, mode, message, fee, scheduledAt } = req.body;

      const existingRequest = await requestRepository.findById(id as string);
      if (!existingRequest) throw new NotFoundError("Request not found");

      // Only student who created it can update
      if (existingRequest.studentId.toString() !== req.userId) {
        throw new ForbiddenError("Not authorized to update this request");
      }

      // Can't update if not pending
      if (existingRequest.status !== "pending") {
        throw new BadRequestError(
          "Cannot update request that is no longer pending",
        );
      }

      const updated = await requestRepository.update(id as string, {
        ...(subject && { subject: subject as string }),
        ...(level && { level: level as string }),
        ...(mode && { mode: mode as "online" | "home" | "both" }),
        ...(message && { message: message as string }),
        ...(fee !== undefined && { fee: Number(fee) }),
        ...(scheduledAt && { scheduledAt: new Date(scheduledAt as string) }),
      });

      sendSuccess({
        res,
        message: "Request updated",
        data: { request: updated },
      });
    } catch (err) {
      next(err);
    }
  },

  async updateRequestStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.userId) throw new BadRequestError("User ID required");
      const { id } = req.params;
      const { status } = req.body as {
        status: "pending" | "approved" | "rejected" | "trial" | "completed";
      };

      if (
        !status ||
        !["pending", "approved", "rejected", "trial", "completed"].includes(
          status,
        )
      ) {
        throw new BadRequestError("Valid status required");
      }

      const existingRequest = await requestRepository.findById(id as string);
      if (!existingRequest) throw new NotFoundError("Request not found");

      // Only the tutor can update status
      if (existingRequest.tutorId.toString() !== req.userId) {
        throw new ForbiddenError("Only the tutor can update request status");
      }

      const updateData: Record<string, any> = { status };

      // CORE RULE: When tutor approves/accepts (trial) → auto-reject all other pending
      // requests from the same student to other tutors
      if (status === "approved" || status === "trial") {
        const trialStartedAt = new Date();
        const trialExpiresAt = new Date(
          trialStartedAt.getTime() + 48 * 60 * 60 * 1000,
        ); // 48 hours
        updateData.trialStartedAt = trialStartedAt;
        updateData.trialExpiresAt = trialExpiresAt;

        // Auto-reject all other pending requests from this student
        const { TutorRequest } = await import("../models/TutorRequest.js");
        await TutorRequest.updateMany(
          {
            studentId: existingRequest.studentId,
            _id: { $ne: existingRequest._id },
            status: "pending",
          },
          { $set: { status: "rejected" } },
        );
      }

      const updated = await requestRepository.update(id as string, updateData);
      sendSuccess({
        res,
        message: "Status updated",
        data: { request: updated },
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.userId) throw new BadRequestError("User ID required");
      const { id } = req.params;

      const existingRequest = await requestRepository.findById(id as string);
      if (!existingRequest) throw new NotFoundError("Request not found");

      // Only student who created it can delete
      if (existingRequest.studentId.toString() !== req.userId) {
        throw new ForbiddenError("Not authorized to delete this request");
      }

      await requestRepository.delete(id as string);
      sendSuccess({ res, message: "Request deleted" });
    } catch (err) {
      next(err);
    }
  },
};
