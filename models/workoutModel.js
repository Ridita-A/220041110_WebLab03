const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  load: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true
  },

  scheduledAt: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },

  notes: {
    type: String
  }

}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)
