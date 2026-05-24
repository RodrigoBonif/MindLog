// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api';

function getToken() {
  return localStorage.getItem('ml_token');
}

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };

  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const config = { method, headers };
  if (body !== undefined) config.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${path}`, config);

  // 204 No Content — return null
  if (response.status === 204) return null;

  const data = await response.json();

  if (!response.ok) {
    const message = data?.message || `Erro ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  get:    (path)         => request('GET',    path),
  post:   (path, body)   => request('POST',   path, body),
  put:    (path, body)   => request('PUT',    path, body),
  patch:  (path, body)   => request('PATCH',  path, body),
  delete: (path)         => request('DELETE', path),
};
