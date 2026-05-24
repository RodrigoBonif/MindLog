// src/middlewares/errorHandler.middleware.js
const AppError = require('../utils/AppError');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  // Known operational errors (thrown via AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Prisma unique constraint violation (P2002)
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'campo';
    return res.status(409).json({
      status: 'error',
      message: `Já existe um registro com esse ${field}`,
    });
  }

  // Prisma record not found (P2025)
  if (err.code === 'P2025') {
    return res.status(404).json({
      status: 'error',
      message: 'Registro não encontrado',
    });
  }

  // Unexpected errors — never leak internals in production
  console.error('💥 Unexpected error:', err);

  return res.status(500).json({
    status: 'error',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Erro interno do servidor',
  });
}

module.exports = errorHandler;
