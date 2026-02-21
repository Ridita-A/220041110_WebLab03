const User = require('../models/userModel')

// Create
const createUser = async (req, res) => {
    const user = await User.create(req.body)
    res.status(200).json(user)
}

// Get all
const getUsers = async (req, res) => {
    const filter = {}

    if (req.query.active)
        filter.active = req.query.active === 'true'

    if (req.query.membershipType)
        filter.membershipType = req.query.membershipType

    const users = await User.find(filter)
    res.status(200).json(users)
}

// Get one
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
}

// Update 
const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(user)
}

// Delete 
const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted' })
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}
