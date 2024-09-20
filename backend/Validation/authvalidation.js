const Joi = require('joi');


const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


// Registration validation schema
const UserSchema = Joi.object({
  firstname: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'First name is required',
      'any.required': 'First name is required',
    }),

  lastname: Joi.string()
    
    .max(50)
    .required()
    .messages({
      'string.empty': 'Last name is required',
      'any.required': 'Last name is required',
    }),

  email: Joi.string() 
    .pattern(emailpattern)
    .required()
    .messages({
      'string.pattern.base': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(6)  
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    }),

  gender: Joi.string()
    .valid('male', 'female', 'other')  
    .required()
    .messages({
      'any.only': 'Gender must be one of the following: male, female, other',
      'any.required': 'Gender is required'
    }),
    
   role: Joi.string()
    .valid('admin', 'employee', 'training')
    .required()
    .messages({
      'any.only': 'Role must be either admin,employee or training',
      'any.required': 'Role is required'
  })
   
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()  
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
  }),

  password: Joi.string()
    .min(6)  // Minimum length for security
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
  })
});

module.exports = {
  UserSchema,
  loginSchema
};