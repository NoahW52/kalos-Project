const mongoose = require('mongoose')
const farmerSchema = new mongoose.Schema({
    farmer: String,
    farmerEmail: String,
    farmerPhone: Number,
    description: String
})

const Farm = mongoose.model('Farm', farmerSchema)
module.exports = Farm