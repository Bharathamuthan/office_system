const mongoose = require('mongoose');

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

    password: {
        type: String,
        required: true
    },
    
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },

    role: {
       type: String,  
       required: true,
       enum: ['admin','employee','training']
     }
   
},  { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;