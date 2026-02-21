const express = require('express')
const router = express.Router()

const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')

// Create
router.post('/createUser', createUser)

// Get All
router.get('/getUsers', getUsers)

// Get one
router.get('/getUser/:id', getUser)

// Update
router.put('/updateUser/:id', updateUser)

// Delete
router.delete('/deleteUser/:id', deleteUser)

module.exports = router
