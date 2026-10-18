const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'the username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'the email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'the password is required']
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superAdmin'],
        default: 'user'
    }

}, {timestamps : true});

module.exports = mongoose.model('the user', UserSchema)