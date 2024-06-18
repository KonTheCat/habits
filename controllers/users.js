const express = require("express")
const router = express.Router()
const Users = require('../models/user.js')

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

module.exports = router