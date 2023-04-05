const mongoose = require('mongoose')
const farmerSchema = new mongoose.Schema({
    Address: String,
    SellerName: String,
    SellerContact: Number,
    Description: String
})

const Land = mongoose.model('Land', farmerSchema)
module.exports = Land