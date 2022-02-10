const asyncHandler = require('express-async-handler')

// /@desc  Get goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'get goals'})
}) 

// /@desc  set goals
// @route  POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {

    if(!req.body.text){
        res.status(404)
        throw new Error('please add a text field')
    }

    res.status(200).json({message: 'set goal'})
})

// /@desc  Update goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = async(async (req, res) => {
    const id = req.params.id
    res.status(200).json({message: `update goal ${id}`})
})

// /@desc  Delete goals
// @route  DELTE /api/goals/:id
// @access Private
const deleteGoal = async(async (req, res) => {
    const id = req.params.id
    res.status(200).json({message: `delete goal ${id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}