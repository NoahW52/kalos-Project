const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('./schemas/user')
require('dotenv').config()
const session = require('express-session')

mongoose.connect(`mongodb+srv://curranod840:${process.env.DB_PASSWORD}@cluster.8cz7y6f.mongodb.net/?retryWrites=true&w=majority`,
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
    const password = req.body.password
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        phone: req.body.phone,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    await user.save()
    res.redirect('/home')
})

app.get('/login', async(req, res) => {
    res.render('login')
})

app.post('/login', async(req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({username: username})
    const hashedPassword = user.password

    if(user) {
        // compare passwords 
        const result = await bcrypt.compare(password, hashedPassword)
        if(result) {
            // user has been authenticated 
            // put something in the session 
            if(req.session) {
                req.session.userId = user.id 
            }

            // send them to the home screen 
            res.redirect('/home')
        } else {
            res.render('login', { errorMessage: 'Invalid credentials.'})
        }
    } else {
        res.render('login', { errorMessage: 'no'})
    }
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})