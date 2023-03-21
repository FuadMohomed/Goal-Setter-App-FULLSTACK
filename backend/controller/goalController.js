const asyncHnadler = require('express-async-handler')
const Goal = require('../Models/goalModel')
const User = require('../Models/userModel')








const getGoals = asyncHnadler( async(req,res) => {
const goals = await Goal.find({user:req.user.id})

res.status(200).json(goals)
})










const createGoals = asyncHnadler( async (req,res) => {
if (!req.body.text) {
    res.status(400)
    throw new Error('please add text feild')
} 

const goal = await Goal.create({
    text: req.body.text,
    user : req.user.id
})

res.status(200).json(goal)
})











const updateGoals = asyncHnadler( async (req,res) => {
const goal = await Goal.findById(req.params.id) 

if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
}
const user = await User.findById(req.user.id)

// check for user
if (!user) {
    res.status(401)
    throw new Error('user not found')
}
//  make sure the logged in user matches the goal user
if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not Authorized')
}

const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

res.status(200).json(updatedGoal)
})













const deleteGoals = asyncHnadler( async (req,res) => {
const goal = await Goal.findById(req.params.id) 

if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
}
const user = await User.findById(req.user.id)

// check for user
if (!user) {
    res.status(401)
    throw new Error('user not found')
}
//  make sure the logged in user matches the goal user
if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not Authorized')
}
 await goal.remove()

res.status(200).json({id: `this id ${req.params.id} has been removed`})
})










module.exports = {
    getGoals, createGoals ,updateGoals , deleteGoals
}
