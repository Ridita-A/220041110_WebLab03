const Trainer = require('../models/trainerModel')

// Create
const createTrainer = async (req, res) => {
    const trainer = await Trainer.create(req.body)
    res.json(trainer)
}

// Get all
const getTrainers = async (req, res) => {
    const filter = {}

    if (req.query.specialization)
        filter.specialization = req.query.specialization

    if (req.query.available)
        filter.available = req.query.available === 'true'

    const trainers = await Trainer.find(filter)
    res.json(trainers)
}

// Get one
const getTrainer = async (req, res) => {
    const trainer = await Trainer.findById(req.params.id)
    res.json(trainer)
}

// Update
const updateTrainer = async (req, res) => {
    const trainer = await Trainer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.json(trainer)
}

// Delete
const deleteTrainer = async (req, res) => {
    await Trainer.findByIdAndDelete(req.params.id)
    res.json({ message: 'Trainer deleted' })
}

module.exports = {
    createTrainer,
    getTrainers,
    getTrainer,
    updateTrainer,
    deleteTrainer
}
