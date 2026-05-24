// src/services/card.service.js
const prisma = require('../config/database');
const AppError = require('../utils/AppError');

async function listCards(userId, { search, prioridade } = {}) {
  const where = { userId };

  if (prioridade) {
    where.prioridade = prioridade;
  }

  if (search) {
    where.OR = [
      { titulo: { contains: search, mode: 'insensitive' } },
      { descricao: { contains: search, mode: 'insensitive' } },
    ];
  }

  return prisma.card.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      titulo: true,
      descricao: true,
      prioridade: true,
      prazo: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function getCard(id, userId) {
  const card = await prisma.card.findFirst({
    where: { id, userId },
    select: {
      id: true,
      titulo: true,
      descricao: true,
      prioridade: true,
      prazo: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!card) throw new AppError('Card não encontrado', 404);
  return card;
}

async function createCard(userId, data) {
  return prisma.card.create({
    data: { ...data, userId },
    select: {
      id: true,
      titulo: true,
      descricao: true,
      prioridade: true,
      prazo: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function updateCard(id, userId, data) {
  // Ensure card belongs to this user
  await getCard(id, userId);

  return prisma.card.update({
    where: { id },
    data,
    select: {
      id: true,
      titulo: true,
      descricao: true,
      prioridade: true,
      prazo: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function deleteCard(id, userId) {
  await getCard(id, userId);
  await prisma.card.delete({ where: { id } });
}

module.exports = { listCards, getCard, createCard, updateCard, deleteCard };
