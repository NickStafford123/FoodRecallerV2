const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [6, 'Username must be at least 6 characters long'],
        unique:[true, 'This Username is taken']
        },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength:[6, 'Password must be at least 6 characters long']
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)