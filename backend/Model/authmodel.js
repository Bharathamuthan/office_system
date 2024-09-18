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
        minlength: 2,
        maxlength: 50  
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ 
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
       enum: ['Admin','employee','customer']
     }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;