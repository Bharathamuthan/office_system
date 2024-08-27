const Joi = require('joi');

// Registration validation schema
const UserSchema = Joi.object({
  FirstName: Joi.string()
    .min(2)
    .max(50)
    .required(),

  LastName: Joi.string()
    .min(2)
    .max(50)
    .required(),

  Email: Joi.string()
    .email()  
    .required(),

  Password: Joi.string()
    .required(),

  Gender: Joi.string()
    .valid('male', 'female', 'other')  
    .required(),

  Phonenumber: Joi.string()
    .required()
    .pattern(/^[0-9]{10}$/).required()
});

// Login validation schema
const loginSchema = Joi.object({
  Email: Joi.string()
    .email()  
    .required(),

  Password: Joi.string()
    .required(),
});

module.exports = {
  UserSchema,
  loginSchema
};
