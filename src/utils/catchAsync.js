/**
 * Wrapper for async route handlers to pass errors to Express error handler
 * Eliminates the need for try/catch blocks in controllers
 * @param {Function} fn - Async route handler function
 * @returns {Function} - Express middleware function
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
