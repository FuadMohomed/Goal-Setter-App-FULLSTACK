const asyncHnadler = require('express-async-handler')


const getGoals = async(req,res) => {
res.status(200).json({message:'Get Goals'})
}
const createGoals = async (req,res) => {
if (!req.body.text) {
    res.status(400)
    throw new Error('please add text feild')
} 
res.status(200).json({message:'create Goals'})
}
const updateGoals = async (req,res) => {
res.status(200).json({message:'update Goals'})
}
const deleteGoals =  async (req,res) => {
res.status(200).json({message:' delete Goals'})
}




module.exports = {
    getGoals, createGoals ,updateGoals , deleteGoals
}
