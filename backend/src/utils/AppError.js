// src/utils/AppError.js

class AppError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {number} statusCode - HTTP status code (default 400)
   */
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // distinguishes known errors from unexpected ones
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
