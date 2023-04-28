const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const Poll = require('../schemas/poll')
const Land = require('../schemas/land')
const User = require('../schemas/user')
const Farm = require('../schemas/farmer')
require('dotenv').config()
const userChecker = require('../app.js');
 
mongoose.connect(`mongodb+srv://curranod840:${process.env.DB_PASSWORD}@cluster.8cz7y6f.mongodb.net/?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
})
.then(() => {
    console.log('DB connected')
}).catch((error) => {
    console.log(error)
})

const userChecker = (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.redirect('/login');
    }
  };
  
  router.get('/', userChecker, async (req, res) => {
    try {
      const user = await User.findById(req.session.userId);
      res.render('user-home', { user });
    } catch (err) {
      console.log(err);
      res.redirect('/login');
    }
  });

router.get('/farmerInfo', (req,res) => {
    res.render('farmerInfo', {user: req.session.user})
})

router.post('/farmerInfo', async (req,res) => {
    
    const newFarmer = new Farm({
        farmer: req.body.farmerName,
        farmerE: req.body.farmerEmail,
        farmerP: req.body.farmerPhone,
        description: req.body.farmerDesc
    })
    await newFarmer.save()
    res.render('farmerInfo')
})

router.get('/findLand', (req,res) => {
    res.render('findLand')
})

router.post('/findLand', async (req,res) => {
    
    const newLand = new Land({
        Address: req.body.addy,
        SellerName: req.body.Sname,
        SellerContact: req.body.contact,
        Description: req.body.description
    })
    await newLand.save()
    res.render('findLand')
})

router.get('/poll', (req, res) => {
    res.render('poll')
})

router.post('/poll', async(req, res) => {

    const pollInfo = new Poll({
    findOut: req.body.responseFO,
    activityInterest: req.body.responseAI,
    kalosInterest: req.body.responseKI,
    users: req.session.user
})
    await pollInfo.save()
    res.redirect('/user-home')
})


module.exports = { router, userChecker };
