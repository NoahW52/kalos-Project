const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

const mongoose = require('mongoose')

app.use('/css/version-1', express.static('css'))

mongoose.connect('mongodb+srv://curranod840:zSfsG5c5SeoIaPpT@cluster.8cz7y6f.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
})
.then(() => {
    console.log('DB connected')
}).catch((error) => {
    console.log(error)
})
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.render('display')
})

app.listen(8080, () => {
    console.log('server is running on http://localhost:8080')
})