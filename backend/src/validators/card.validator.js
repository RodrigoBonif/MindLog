// src/validators/card.validator.js
const { z } = require('zod');

const PRIORITIES = ['Alta', 'Media', 'Baixa'];

const createCardSchema = z.object({
  titulo: z
    .string({ required_error: 'Título é obrigatório' })
    .min(1, 'Título é obrigatório')
    .max(150, 'Título deve ter no máximo 150 caracteres'),
  descricao: z.string().max(2000, 'Descrição deve ter no máximo 2000 caracteres').optional().nullable(),
  prioridade: z.enum(PRIORITIES, { errorMap: () => ({ message: 'Prioridade deve ser Alta, Media ou Baixa' }) }).default('Media'),
  prazo: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Prazo deve estar no formato dd/mm/aaaa')
    .optional()
    .nullable()
    .or(z.literal('')),
});

const updateCardSchema = createCardSchema.partial();

module.exports = { createCardSchema, updateCardSchema };
