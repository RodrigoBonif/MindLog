// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const AppError = require('../utils/AppError');
const prisma = require('../config/database');

async function authMiddleware(req, _res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Token de autenticação não fornecido', 401);
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, jwtConfig.secret);
  } catch {
    throw new AppError('Token inválido ou expirado', 401);
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.sub } });
  if (!user) {
    throw new AppError('Usuário não encontrado', 401);
  }

  // Attach lean user object (no password) to request
  req.user = { id: user.id, login: user.login, nome: user.nome };
  next();
}

module.exports = authMiddleware;
