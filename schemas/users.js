const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: Number,
    password: String,
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task