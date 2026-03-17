const express = require("express");
const authRoute = require("./v1/auth.route");
const requestRoute = require("./v1/request.route");
const paymentRoute = require("./v1/payment.route");
const reviewRoute = require("./v1/review.route");
const tutorRoute = require("./v1/tutor.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/requests",
    route: requestRoute,
  },
  {
    path: "/payments",
    route: paymentRoute,
  },
  {
    path: "/reviews",
    route: reviewRoute,
  },
  {
    path: "/tutors",
    route: tutorRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
