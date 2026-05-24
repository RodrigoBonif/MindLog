// src/routes/index.js
const { Router } = require('express');
const authRoutes = require('./auth.routes');
const cardRoutes = require('./card.routes');
const userRoutes = require('./user.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/cards', cardRoutes);
router.use('/users', userRoutes);

// Health check
router.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

module.exports = router;
