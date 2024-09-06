const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50  
    },
     
    LastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50  
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/  
    },

    Password: {
        type: String,
        required: true
    },
    
    Gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },

    Role: {
       type: String,  
       required: true,
       enum: ['Admin','employee','customer']
     }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
