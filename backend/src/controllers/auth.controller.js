// src/controllers/auth.controller.js
const authService = require('../services/auth.service');

async function register(req, res) {
  const user = await authService.register(req.body);
  return res.status(201).json({ status: 'success', data: { user } });
}

async function login(req, res) {
  const { token, user } = await authService.login(req.body);
  return res.status(200).json({ status: 'success', data: { token, user } });
}

module.exports = { register, login };
