const Joi = require('joi'); 

const taskSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().allow(null, ''), // Allow empty or null description
  assignedTo: Joi.string().optional(), // Optional field for assigned user
  status: Joi.string().valid('not started', 'in progress', 'completed').optional(),
});

module.exports = taskSchema;
