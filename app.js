const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('./schemas/user')
const Land = require('./schemas/land')
const Poll = require('./schemas/poll')
const Farm = require('./schemas/farmer')
require('dotenv').config()
const session = require('express-session')


app.use('/css/version-1', express.static('css'))

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
    res.redirect('/user-home')
})
app.get('/user-home', (req,res) => {
    res.render('user-home', {user: req.session.user})
})
app.post('/user-home', async (req, res) => {

})

app.get('/poll', (req, res) => {
    res.render('poll')
})
app.post('/poll', async(req, res) => {

    const pollInfo = new Poll({
    findOut: req.body.responseFO,
    activityInterest: req.body.responseAI,
    kalosInterest: req.body.responseKI,
    users: req.session.user
})
    await pollInfo.save()
    res.redirect('/user-home')
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
                req.session.user = user.username
            }
            
            // send them to the home screen 
            res.redirect('/user-home')
        } else {
            res.render('login', { errorMessage: 'Invalid credentials.'})
        }
    } else {
        res.render('login', { errorMessage: 'no'})
    }
})

app.get('/findLand', (req,res) => {
    res.render('findLand')
})

app.post('/findLand', async (req,res) => {
    
    const newLand = new Land({
        Address: req.body.addy,
        SellerName: req.body.Sname,
        SellerContact: req.body.contact,
        Description: req.body.description
    })
    await newLand.save()
    res.render('findLand')
})
app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})