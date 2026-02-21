const express = require('express')
const router = express.Router()

const {
    createTrainer,
    getTrainers,
    getTrainer,
    updateTrainer,
    deleteTrainer
} = require('../controllers/trainerController')

// Create
router.post('/createTrainer', createTrainer)

// Get all
router.get('/getTrainers', getTrainers)

// Get one
router.get('/getTrainer/:id', getTrainer)

// Update
router.put('/updateTrainer/:id', updateTrainer)

// Delete
router.delete('/deleteTrainer/:id', deleteTrainer)

module.exports = router
