// src/middlewares/validate.middleware.js
const AppError = require('../utils/AppError');

/**
 * Returns an Express middleware that validates req.body against a Zod schema.
 * On failure it throws an AppError(422) with the first validation message.
 *
 * @param {import('zod').ZodSchema} schema
 */
function validate(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.errors[0]?.message || 'Dados inválidos';
      throw new AppError(message, 422);
    }
    // Replace body with the parsed (and typed) data so controllers get clean values
    req.body = result.data;
    next();
  };
}

module.exports = validate;
