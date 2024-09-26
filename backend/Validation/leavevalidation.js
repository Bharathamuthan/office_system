const Joi = require('joi');

const leaveRequestSchema = Joi.object({
  reason: Joi.string().required(),
  date: Joi.date().iso().required(),
  description: Joi.string().optional()
});

const requestIdSchema = Joi.object({
  id: Joi.string().required()
});

module.exports = { leaveRequestSchema, requestIdSchema };
