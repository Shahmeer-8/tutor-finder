import { Router } from "express";
import { profileController } from "../controllers/profileController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { uploadAvatar, uploadDocument } from "../middleware/uploadMiddleware.js";

const router = Router();

router.use(authenticate);

router.get("/", profileController.getProfile);
router.put("/", profileController.updateProfile);
router.patch("/", profileController.updateProfile);

router.post(
  "/avatar",
  uploadAvatar,
  profileController.uploadAvatar
);

router.post(
  "/documents",
  authorize("tutor", "student"),
  uploadDocument,
  profileController.uploadDocument
);

export default router;
