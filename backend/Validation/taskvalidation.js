const joi = require ('joi');

// Define the Joi schema for task validation
const taskSchema = Joi.object({
  adminId: Joi.string().length(24).hex().required(), // ObjectId validation
  title: Joi.string().trim().required(),
  description: Joi.string().trim().optional(),
  assignedTo: Joi.string().length(24).hex().optional(), // ObjectId validation
  status: Joi.string().valid('not started', 'in progress', 'completed').default('not started')
});

module.exports = taskSchema;
