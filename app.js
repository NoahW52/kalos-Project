const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
// const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('./schemas/user')
// let salt = await bcrypt.genSalt(10)
// let hashedPassword = awaitbcrypt.hash
require('dotenv').config()
const session = require('express-session')

mongoose.connect('mongodb+srv://curranod840:zSfsG5c5SeoIaPpT@cluster.8cz7y6f.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
})
.then(() => {
    console.log('DB connected')
}).catch((error) => {
    console.log(error)
})

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', (req, res) => {
    res.render('home')
})



app.get('/register', async(req, res) => {
    res.render('register')
})


app.post('/register', async(req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    await user.save()
    res.redirect('/home')
})


app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})