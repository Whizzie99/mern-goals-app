const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// /@desc  Get goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler (async (req, res) => {
    const goals = await Goal.find({ user: req.user.id})
    res.status(200).json(goals)
}) 

// /@desc  set goals
// @route  POST /api/goals
// @access Private
const setGoal = asyncHandler (async (req, res) => {

    if(!req.body.text){
        res.status(404)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

// /@desc  Update goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler (async (req, res) => {
    const id = req.params.id
    const goal = await Goal.findById(id)

    if(!goal){
        res.status(400)
        throw new Error('goal not found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!user){
        res.status(401)
        throw new Error('user not found')
    }

    // make sure the logged matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, {new: true,})
    res.status(200).json(goal)
})

// /@desc  Delete goals
// @route  DELTE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler (async (req, res) => {
    const id = req.params.id
    const goal = await Goal.findById(id)

    if(!goal){
        res.status(400)
        throw new Error('goal not found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!user){
        res.status(401)
        throw new Error('user not found')
    }

    // make sure the logged matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()
    res.status(200).json({id: id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}