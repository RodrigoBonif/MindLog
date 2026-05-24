// src/services/user.service.js
const prisma = require('../config/database');

async function getProfile(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, login: true, nome: true, createdAt: true },
  });
}

async function updateProfile(userId, { nome }) {
  return prisma.user.update({
    where: { id: userId },
    data: { nome },
    select: { id: true, login: true, nome: true, updatedAt: true },
  });
}

module.exports = { getProfile, updateProfile };
