const mongoose = require('mongoose')
const farmerSchema = new mongoose.Schema({
    Address: String,
    SellerName: String,
    SellerContact: Number,
    emailContact: String,
    Description: String
})

const Land = mongoose.model('Land', farmerSchema)
module.exports = Land