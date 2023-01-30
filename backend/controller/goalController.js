const asyncHnadler = require('express-async-handler')
const Goal = require('../Models/goalModel')


const getGoals = asyncHnadler( async(req,res) => {
const goals = await Goal.find()

res.status(200).json(goals)
})

const createGoals = asyncHnadler( async (req,res) => {
if (!req.body.text) {
    res.status(400)
    throw new Error('please add text feild')
} 

const goal = await Goal.create({
    text: req.body.text
})

res.status(200).json(goal)
})

const updateGoals = asyncHnadler( async (req,res) => {
const goal = await Goal.findById(req.params.id) 

if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
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

 await goal.remove()

res.status(200).json({id: `this id ${req.params.id} has been removed`})
})




module.exports = {
    getGoals, createGoals ,updateGoals , deleteGoals
}
