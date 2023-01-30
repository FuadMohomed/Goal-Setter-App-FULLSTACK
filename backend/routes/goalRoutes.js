const express = require('express')
const { getGoals, createGoals ,updateGoals , deleteGoals } = require('../controller/goalController')
const router = express.Router()


router.route('/').get(getGoals).post(createGoals)
router.route('/:id').put(updateGoals).delete(deleteGoals)


module.exports = router