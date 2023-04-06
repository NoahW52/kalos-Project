const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../schemas/user')
const Poll = require('../schemas/poll')
const Land = require('../schemas/land')
const Farm = require('../schemas/farmer')
require('dotenv').config()

mongoose.connect(`mongodb+srv://curranod840:${process.env.DB_PASSWORD}@cluster.8cz7y6f.mongodb.net/?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
})
.then(() => {
    console.log('DB connected')
}).catch((error) => {
    console.log(error)
})


router.get('/adminHome', async(req, res) => {
    res.render('adminHome')
})

router.get('/users', async (req, res) => {
    const user = await User.find({})
    res.render('users', {userTable: user})
})

router.get('/farmers', async (req, res) => {
    const farmer = await Farm.find({})
    res.render('farmers', {farmerTable: farmer})
})

router.get('/lands', async (req, res) => {
    const land = await Land.find({})
    res.render('lands', {landTable: land})
})

router.get('/polls', async (req, res) => {
    const poll = await Poll.find({})
    res.render('polls', {pollTable: poll})
})

router.post('/updateUser', async (req, res) => {
    const userId = req.body.userId
    const item = await User.findById(userId)
    res.render('update-user', item)
})

router.post('/updateUserEditor', async(req, res) => {
    const userId = req.body.userId
    const userToUpdate = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isAdmin: req.body.admin,
    }
    await User.findByIdAndUpdate(userId, userToUpdate)
    res.redirect('/users')
})



module.exports = router