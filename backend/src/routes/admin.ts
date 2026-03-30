import { Router } from "express";
import { adminController } from "../controllers/adminController.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.get(
  "/admin/stats",
  authenticate,
  requireAdmin,
  adminController.getStats,
);
router.get(
  "/admin/users",
  authenticate,
  requireAdmin,
  adminController.getUsers,
);
router.patch(
  "/admin/users/:id/block",
  authenticate,
  requireAdmin,
  adminController.blockUser,
);
router.patch(
  "/admin/users/:id/unblock",
  authenticate,
  requireAdmin,
  adminController.unblockUser,
);
router.get(
  "/admin/tutors/pending",
  authenticate,
  requireAdmin,
  adminController.getPendingTutors,
);
router.patch(
  "/admin/tutors/:id/verify",
  authenticate,
  requireAdmin,
  adminController.approveTutor,
);
router.patch(
  "/admin/tutors/:id/reject",
  authenticate,
  requireAdmin,
  adminController.rejectTutor,
);
router.patch(
  "/admin/tutors/:id/interview",
  authenticate,
  requireAdmin,
  adminController.scheduleInterview,
);
router.get(
  "/admin/requests",
  authenticate,
  requireAdmin,
  adminController.getAllRequests,
);

router.get(
  "/admin/courses",
  authenticate,
  requireAdmin,
  adminController.getCourses,
);
router.post(
  "/admin/courses",
  authenticate,
  requireAdmin,
  adminController.createCourse,
);
router.patch(
  "/admin/courses/:id",
  authenticate,
  requireAdmin,
  adminController.updateCourse,
);
router.delete(
  "/admin/courses/:id",
  authenticate,
  requireAdmin,
  adminController.deleteCourse,
);

export default router;
