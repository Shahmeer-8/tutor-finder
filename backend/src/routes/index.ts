import { Router } from "express";
import authRouter from "./auth.js";
import profileRouter from "./profile.js";
import courseRouter from "./courses.js";
import chatRouter from "./chats.js";
import requestRouter from "./requests.js";
import earningsRouter from "./earnings.js";
import adminRouter from "./admin.js";
import tutorsRouter from "./tutors.js";
import reviewsRouter from "./reviews.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/", courseRouter);
router.use("/", chatRouter);
router.use("/", requestRouter);
router.use("/", earningsRouter);
router.use("/", adminRouter);
router.use("/", tutorsRouter);
router.use("/", reviewsRouter);

export default router;
