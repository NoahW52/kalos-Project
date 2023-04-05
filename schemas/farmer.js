const mongoose = require('mongoose')
const farmerSchema = new mongoose.Schema({
    farmer: String,
    farmerE: String,
    farmerP: Number,
    description: String
})

const Farm = mongoose.model('Farm', farmerSchema)
module.exports = Farm