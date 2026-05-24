// src/validators/user.validator.js
const { z } = require('zod');

const updateProfileSchema = z.object({
  nome: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
});

module.exports = { updateProfileSchema };
