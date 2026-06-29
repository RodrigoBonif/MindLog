// src/services/cards.js
import { api } from './api';

export async function listCards({ search, prioridade, concluido } = {}) {
  const params = new URLSearchParams();
  if (search)     params.set('search', search);
  if (prioridade) params.set('prioridade', prioridade);
  if (concluido !== undefined) params.set('concluido', String(concluido));

  const query = params.toString() ? `?${params}` : '';
  const res = await api.get(`/cards${query}`);
  return res.data.cards;
}

export async function createCard(data) {
  const res = await api.post('/cards', data);
  return res.data.card;
}

export async function updateCard(id, data) {
  const res = await api.patch(`/cards/${id}`, data);
  return res.data.card;
}

export async function deleteCard(id) {
  await api.delete(`/cards/${id}`);
}
