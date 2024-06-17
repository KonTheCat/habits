const express = require('express')
const methodOverride = require('method-override')
const habitsController = require('./controllers/habits.js')
const mongoose = require('mongoose')
const app = express()
const port = process.env.port || 4006
const mongoURI = process.env.mongoURI || "mongodb://127.0.0.1:27017/habits"

//Middleware
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use('/habits', habitsController)

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