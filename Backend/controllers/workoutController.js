const Workout = require('../models/workoutModel')
const User = require('../models/userModel')
const Trainer = require('../models/trainerModel')

// Get all
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({})
    .populate('user')
    .populate('trainer')
    .sort({ createdAt: -1 })

  res.status(200).json(workouts)
}

// Get one
const getWorkout = async (req, res) => {
  const { id } = req.params

  const workout = await Workout.findById(id)
    .populate('user')
    .populate('trainer')

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// Create
const createWorkout = async (req, res) => {
  const { workoutType, load, reps, difficulty } = req.body

  try {
    const workout = await Workout.create({
      workoutType,
      load,
      reps,
      difficulty,
      user: req.body.user,
      trainer: req.body.trainer,
      scheduledAt: req.body.scheduledAt
    })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  const workout = await Workout.findOneAndDelete({ _id: id })

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// Update
const updateWorkout = async (req, res) => {
  const { id } = req.params

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  )

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

const scheduleWorkout = async (req, res) => {
  try {
    const { userId, trainerId, workoutType, load, reps, difficulty, scheduledAt, notes } = req.body

    // Validate user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Membership check
    if (!['premium', 'elite'].includes(user.membershipType)) {
      return res.status(403).json({
        error: 'Only premium or elite members can schedule workouts'
      })
    }

    // Validate trainer
    const trainer = await Trainer.findById(trainerId)
    if (!trainer || !trainer.available) {
      return res.status(400).json({ error: 'Trainer not available' })
    }

    // Check time conflict (user)
    const userConflict = await Workout.findOne({
      user: userId,
      scheduledAt
    })

    if (userConflict) {
      return res.status(400).json({
        error: 'User already has a workout at this time'
      })
    }

    // Check time conflict (trainer)
    const trainerConflict = await Workout.findOne({
      trainer: trainerId,
      scheduledAt
    })

    if (trainerConflict) {
      return res.status(400).json({
        error: 'Trainer already has a workout scheduled at this time'
      })
    }

    // Create scheduled workout
    const workout = await Workout.create({
      workoutType,
      load,
      reps,
      difficulty,
      user: userId,
      trainer: trainerId,
      scheduledAt,
      notes,
      status: 'scheduled'
    })

    res.status(201).json({
      message: 'Workout scheduled successfully',
      workout
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  scheduleWorkout
}
