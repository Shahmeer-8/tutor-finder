const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const httpStatus = require("http-status");
const config = require("./config/env");
const morgan = require("./middlewares/morgan");
const { apiLimiter } = require("./middlewares/rateLimiter");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

const app = express();

// setup HTTP request logging
if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// Stripe Webhook needs raw body, not JSON
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// parse cookies (ready for HTTP-only JWTs)
app.use(cookieParser());

// enable cors
app.use(cors());
app.options("*", cors());

// limit repeated failed requests to API endpoints in production
if (config.env === "production") {
  app.use("/api", apiLimiter);
}

// core api routes
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// central error handler
app.use(errorHandler);

module.exports = app;
