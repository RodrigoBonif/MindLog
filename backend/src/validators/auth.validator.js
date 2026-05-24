// src/validators/auth.validator.js
const { z } = require('zod');

const registerSchema = z.object({
  login: z
    .string({ required_error: 'Login é obrigatório' })
    .min(3, 'Login deve ter pelo menos 3 caracteres')
    .max(30, 'Login deve ter no máximo 30 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Login deve conter apenas letras, números e underscore'),
  nome: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  senha: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

const loginSchema = z.object({
  login: z.string({ required_error: 'Login é obrigatório' }).min(1, 'Login é obrigatório'),
  senha: z.string({ required_error: 'Senha é obrigatória' }).min(1, 'Senha é obrigatória'),
});

module.exports = { registerSchema, loginSchema };
