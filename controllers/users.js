const express = require("express")
const router = express.Router()
const Users = require('../models/user.js')
const CookieBlacklist = require('../models/cookieBlacklist.js')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('login.ejs')
})

router.post('/', async (req, res) => {
    const userInDatabase = await Users.findOne({'email': req.body.email}).select("+password")
    if (userInDatabase) {
        console.log(`user is in database`)
        const isPasswordValid = bcrypt.compare(`${req.body.password}`, userInDatabase.password)
        if (isPasswordValid) {
            console.log(`successful login`)
            let options = {
                maxAge: 180 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "None",
            }
            const token = userInDatabase.generateAccessJWT()
            res.cookie("SessionID", token, options)
        } else {
            console.log(`incorrect credentials`)
            res.redirect("/login")
        }
    } else {
        console.log(`user is not in database`)
        res.redirect("/login/register")
    }
    res.redirect('/')
})

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/register', async (req, res) => {
    try {
        await Users.create(req.body) 
        res.redirect('/')
    } catch (err) {
        console.error(err)
    }
})

router.get('/logout', async (req, res) => {
    try {
        const authHeader = req.headers['cookie']
        const cookie = authHeader.split('=')[1]
        const accessToken = cookie.split(';')[0]
        console.log(`check cookie blacklisted`)
        const checkIfBlacklisted = await CookieBlacklist.findOne({ token: accessToken })
        if (! checkIfBlacklisted) {
            console.log(`blacklist`)
            const blacklist = await CookieBlacklist.create({token: accessToken})
        }
        res.setHeader('Clear-Site-Data', '"cookies"')
        res.redirect("/")
    } catch (err) {
        console.error(err)
    }
})

module.exports = router