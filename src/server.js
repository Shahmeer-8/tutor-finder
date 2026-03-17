const app = require("./app");
const config = require("./config/env");
const logger = require("./config/logger");
const connectDB = require("./config/db");
const http = require("http");
const initializeSocket = require("./sockets");

let server;

const startServer = async () => {
  // Connect to MongoDB (Atlas-ready)
  await connectDB();

  // Create HTTP server out of the Express app
  const httpServer = http.createServer(app);

  // Initialize Socket.IO with the HTTP server
  initializeSocket(httpServer);

  // Start express server
  server = httpServer.listen(config.port, () => {
    logger.info(
      `Server is running and listening on port ${config.port} in ${config.env} mode`,
    );
  });
};

startServer();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
