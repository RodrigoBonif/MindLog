// src/config/jwt.js
module.exports = {
  secret: process.env.JWT_SECRET || 'fallback-secret-dev-only',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
