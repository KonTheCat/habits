//substantially inspired by https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const accessToken = process.env.SECRET_ACCESS_TOKEN

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String, 
            required: "Your first name is required", 
            max: 25
        },
        lastName: {
            type: String,
            required: "Your last name is required",
            max: 25
        },
        email: {
            type: String, 
            required: "Your email is required",
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String, 
            required: "Your password is required",
            select: false,
            max: 25
        },
        role: {
            type: String,
            required: true,
            default: "0x01",
        },
    },
    {timestamps: true}
)

userSchema.pre("save", function(next) {
    const user = this;
    if (! user.isModified("password")) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

userSchema.methods.generateAccessJWT = function () {
    let payload = {
        id: this._id,
    }
    return jwt.sign(payload, accessToken, {
        expiresIn: '180m'
    })
}

const User = mongoose.model('User', userSchema)
module.exports = User