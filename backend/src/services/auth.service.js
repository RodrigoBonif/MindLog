// src/services/auth.service.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');
const jwtConfig = require('../config/jwt');
const AppError = require('../utils/AppError');

const SALT_ROUNDS = 10;

async function register({ login, nome, senha }) {
  const exists = await prisma.user.findUnique({ where: { login } });
  if (exists) {
    throw new AppError('Login já está em uso', 409);
  }

  const hash = await bcrypt.hash(senha, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: { login, nome, senha: hash },
    select: { id: true, login: true, nome: true, createdAt: true },
  });

  return user;
}

async function login({ login, senha }) {
  const user = await prisma.user.findUnique({ where: { login } });
  if (!user) {
    throw new AppError('Login ou senha incorretos', 401);
  }

  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) {
    throw new AppError('Login ou senha incorretos', 401);
  }

  const token = jwt.sign({ sub: user.id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  return {
    token,
    user: { id: user.id, login: user.login, nome: user.nome },
  };
}

module.exports = { register, login };
