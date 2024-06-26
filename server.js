require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const habitsController = require('./controllers/habits.js')
const usersController = require('./controllers/users.js')
const mongoose = require('mongoose')
const app = express()
const port = process.env.port
const mongoURI = process.env.mongoURI

//Middleware
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use('/habits', habitsController)
app.use('/login', usersController)

//Static
app.use(express.static('public'))

async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI)
    } catch (err) {
        console.error(err)
    }
}

connectToMongo()

app.get("/", (req, res) => {
    res.redirect("/habits")
})

app.listen(port, () => {
    console.log(`the server is running on port ${port}`)
})