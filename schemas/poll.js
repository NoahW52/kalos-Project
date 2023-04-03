const mongoose = require('mongoose')
const pollSchema = new mongoose.Schema({ 
    findOut: String,
    activityInterest: String,
    kalosInterest: String,
    users: String
})

const Poll = mongoose.model('Poll', pollSchema)
module.exports = Poll