const mongoose = require('mongoose')
const Schema = mongoose.Schema

const habitSchema = new Schema({
    userID: String, 
    name: String,
    description: String,
    category: String, 
    completions: [{
        date: Date,
        notes: String
    }]
})

const Habit = mongoose.model('Habit', habitSchema)

module.exports = Habit