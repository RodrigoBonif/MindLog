// src/services/card.service.js
const prisma = require('../config/database');
const AppError = require('../utils/AppError');

const cardSelect = {
  id: true,
  titulo: true,
  descricao: true,
  prioridade: true,
  prazo: true,
  concluido: true,
  createdAt: true,
  updatedAt: true,
};

async function listCards(userId, { search, prioridade, concluido } = {}) {
  const where = { userId };

  if (prioridade) {
    where.prioridade = prioridade;
  }

  // Filtra por status de conclusão quando informado (true/false).
  if (typeof concluido === 'boolean') {
    where.concluido = concluido;
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
    select: cardSelect,
  });
}

async function getCard(id, userId) {
  const card = await prisma.card.findFirst({
    where: { id, userId },
    select: cardSelect,
  });
  if (!card) throw new AppError('Card não encontrado', 404);
  return card;
}

async function createCard(userId, data) {
  return prisma.card.create({
    data: { ...data, userId },
    select: cardSelect,
  });
}

async function updateCard(id, userId, data) {
  // Ensure card belongs to this user
  await getCard(id, userId);

  return prisma.card.update({
    where: { id },
    data,
    select: cardSelect,
  });
}

async function deleteCard(id, userId) {
  await getCard(id, userId);
  await prisma.card.delete({ where: { id } });
}

module.exports = { listCards, getCard, createCard, updateCard, deleteCard };
