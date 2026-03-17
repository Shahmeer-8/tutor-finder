const express = require("express");
const { authController } = require("../../controllers");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Example of a protected route using the auth middleware
router.get("/me", auth(), (req, res) => {
  res.send(req.user);
});

module.exports = router;
