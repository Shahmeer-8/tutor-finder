import { Router } from "express";
import authRouter from "./auth.js";
import profileRouter from "./profile.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.use("/auth", authRouter);
router.use("/profile", profileRouter);

export default router;
