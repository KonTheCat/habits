const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cookieBlacklistSchema = new Schema(
    {
        token: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

const CookieBlacklist = mongoose.model('CookieBlacklist', cookieBlacklistSchema)
module.exports = CookieBlacklist