// src/routes/user.routes.js
const { Router } = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { updateProfileSchema } = require('../validators/user.validator');

const router = Router();

router.use(authMiddleware);

// GET   /api/users/me   — current user profile
// PATCH /api/users/me   — update profile (nome)

router.get('/me', userController.me);
router.patch('/me', validate(updateProfileSchema), userController.update);

module.exports = router;
