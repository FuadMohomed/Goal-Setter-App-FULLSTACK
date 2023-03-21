const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')

const registerUser = asyncHandler( async (req,res) => {
const {name, email, password } = req.body

if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all feilds')
}
//check if user exist
const userExist = await User.findOne({email})

if (userExist) {
    res.status(400)
    throw new Error('User already exists')
}

// Hash Password
const salt = await bcrypt.genSalt(10)
const hashPassowrd = await bcrypt.hash(password, salt)


//create user 
const user = await User.create({
    name,
    email,
    password:hashPassowrd
})

if (user) {
    res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        token: generateToken(user._id)
    })
} else {
    res.status(400)
    throw new Error('Invalid user data')
}


})




const loginUser = asyncHandler( async (req,res) => {
const {email,password} = req.body

// check for user email
const user =  await User.findOne({email})

if (user && (await bcrypt.compare(password, user.password)) ) {
     res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        token: generateToken(user._id),
    }) 
} else {
     res.status(400)
    throw new Error('Invalid Credentials')
    }


})

const getMe = asyncHandler( async (req,res) => {

    const {_id, name, email} = await User.findById(req.user.id)
 res.status(200).json({
     id: _id,
     name,
     email
 })    

})

// Generate token
const generateToken = (id) => {
return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn:'30d'
})
}

module.exports = {
    loginUser,
    registerUser,
    getMe
}