// src/services/users.js
import { api } from './api';

export async function updateProfile({ nome }) {
  const res = await api.patch('/users/me', { nome });
  // Keep localStorage in sync
  const current = JSON.parse(localStorage.getItem('ml_current_user') || '{}');
  const updated = { ...current, ...res.data.user };
  localStorage.setItem('ml_current_user', JSON.stringify(updated));
  return updated;
}
