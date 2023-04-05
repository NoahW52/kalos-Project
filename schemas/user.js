const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: Number,
    password: String,
    firstName: String,
    lastName: String, 
    isAdmin: { 
        type: Boolean, 
        default: false 
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User