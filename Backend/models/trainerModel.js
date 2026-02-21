const mongoose = require('mongoose')

const Schema = mongoose.Schema

const trainerSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    specialization: {
        type: [String],
        enum: ['yoga', 'cardio', 'strength', 'pilates', 'cross-fit']
    },

    experienceYears: {
        type: Number,
        min: 1
    },

    hourlyRate: {
        type: Number,
        required: true,
        min: 10
    },

    available: {
        type: Boolean,
        default: true
    },

    certifications: [String]
})

module.exports = mongoose.model('Trainer', trainerSchema)
