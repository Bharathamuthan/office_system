const Joi = require('joi');

<<<<<<< HEAD

const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
=======
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50  
    },
     
    lastname: {
        type: String,
        required: true,
        maxlength: 50  
    },

    email: {
        type: String,
        required: true,
        unique: true,
       
    },
>>>>>>> 0604e08e799d819e0501db4d2c441397a1f920ef


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

<<<<<<< HEAD
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
=======
    role: {
       type: String,  
       required: true,
       enum: ['admin','employee','training']
     }
   
},  { timestamps: true });
>>>>>>> 0604e08e799d819e0501db4d2c441397a1f920ef

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