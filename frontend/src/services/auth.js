// src/services/auth.js
import { api } from './api';

export async function register(data) {
  // data: { login, nome, senha }
  const res = await api.post('/auth/register', data);
  return res.data.user;
}

export async function login(data) {
  // data: { login, senha }
  const res = await api.post('/auth/login', data);
  const { token, user } = res.data;

  // Persist token and user for next page loads
  localStorage.setItem('ml_token', token);
  localStorage.setItem('ml_current_user', JSON.stringify(user));

  return user;
}

export function logout() {
  localStorage.removeItem('ml_token');
  localStorage.removeItem('ml_current_user');
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('ml_current_user'));
  } catch {
    return null;
  }
}
