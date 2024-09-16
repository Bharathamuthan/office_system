const Joi = require('joi');

// Registration validation schema
const UserSchema = Joi.object({
  firstname: Joi.string()
    .min(2)
    .max(50)
    .required(),

  lastname: Joi.string()
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .email()  
    .required(),

  password: Joi.string()
    .min(8)  // Minimum length for security
    //.pattern(/(?=.*[A-Z])(?=.*\d)/)  // At least one uppercase letter and one number
    .required(),

  gender: Joi.string()
    .valid('male', 'female', 'other')  
    .required(),
    
   role: Joi.string()
    .valid('Admin', 'employee', 'customer')
    .required()
   
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()  
    .required(),

  password: Joi.string()
    .min(8)  // Minimum length for security
    .required(),
});

module.exports = {
  UserSchema,
  loginSchema
};

