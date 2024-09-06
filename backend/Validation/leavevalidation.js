const Joi = require('joi');

// Schema for requesting leave
const leaveRequestSchema = Joi.object({
  reason: Joi.string().required(),
  date: Joi.date().iso().required(),
  description: Joi.string().optional()
});

// Schema for validating leave request ID
const requestIdSchema = Joi.object({
  id: Joi.string().length(24).hex().required() // Assuming MongoDB ObjectId format
});

module.exports = {
  leaveRequestSchema,
  requestIdSchema
};
