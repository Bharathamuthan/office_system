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
    .min(8)  // Minimum length for security
    //.pattern(/(?=.*[A-Z])(?=.*\d)/)  // At least one uppercase letter and one number
    .required(),

  Gender: Joi.string()
    .valid('male', 'female', 'other')  
    .required(),
    
   Role: Joi.string()
    .valid('Admin', 'employee', 'customer')
    .required()
   
});

// Login validation schema
const loginSchema = Joi.object({
  Email: Joi.string()
    .email()  
    .required(),

  Password: Joi.string()
    .min(8)  // Minimum length for security
    .required(),
});

module.exports = {
  UserSchema,
  loginSchema
};

