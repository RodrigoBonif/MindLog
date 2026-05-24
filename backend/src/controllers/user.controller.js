// src/controllers/user.controller.js
const userService = require('../services/user.service');

async function me(req, res) {
  const user = await userService.getProfile(req.user.id);
  return res.json({ status: 'success', data: { user } });
}

async function update(req, res) {
  const user = await userService.updateProfile(req.user.id, req.body);
  return res.json({ status: 'success', data: { user } });
}

module.exports = { me, update };
