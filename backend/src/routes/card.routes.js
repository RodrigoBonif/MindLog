// src/routes/card.routes.js
const { Router } = require('express');
const cardController = require('../controllers/card.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createCardSchema, updateCardSchema } = require('../validators/card.validator');

const router = Router();

// All card routes require authentication
router.use(authMiddleware);

// GET    /api/cards          — list (supports ?search=&prioridade=)
// POST   /api/cards          — create
// GET    /api/cards/:id      — get one
// PUT    /api/cards/:id      — replace
// PATCH  /api/cards/:id      — partial update
// DELETE /api/cards/:id      — delete

router.get('/', cardController.index);
router.post('/', validate(createCardSchema), cardController.store);
router.get('/:id', cardController.show);
router.put('/:id', validate(createCardSchema), cardController.update);
router.patch('/:id', validate(updateCardSchema), cardController.update);
router.delete('/:id', cardController.destroy);

module.exports = router;
