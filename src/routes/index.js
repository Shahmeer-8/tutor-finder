const express = require("express");
const authRoute = require("./v1/auth.route");
const requestRoute = require("./v1/request.route");

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
