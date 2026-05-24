// src/controllers/card.controller.js
const cardService = require('../services/card.service');

async function index(req, res) {
  const { search, prioridade } = req.query;
  const cards = await cardService.listCards(req.user.id, { search, prioridade });
  return res.json({ status: 'success', data: { cards } });
}

async function show(req, res) {
  const card = await cardService.getCard(req.params.id, req.user.id);
  return res.json({ status: 'success', data: { card } });
}

async function store(req, res) {
  const card = await cardService.createCard(req.user.id, req.body);
  return res.status(201).json({ status: 'success', data: { card } });
}

async function update(req, res) {
  const card = await cardService.updateCard(req.params.id, req.user.id, req.body);
  return res.json({ status: 'success', data: { card } });
}

async function destroy(req, res) {
  await cardService.deleteCard(req.params.id, req.user.id);
  return res.status(204).send();
}

module.exports = { index, show, store, update, destroy };
