const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bcrypt = require('bcrypt.js')
const mongoose = require('mongoose')
let salt = await bcrypt.genSalt(10)
let hashedPassword = awaitbcrypt.hash

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
    secret: 'sksksksks',
    resave: false,
    saveUninitialized: true
}))
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.urlencoded())


app.listen(8080, () => {
    console.log('server is running on http://localhost:8080')
})