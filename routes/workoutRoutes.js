const express = require('express');

const router = express.Router();
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  scheduleWorkout
} = require('../controllers/workoutController');

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// Get all workouts with difficulty filter
router.get('/filter', (req, res) => {
  res.json({ mssg: 'GET all workouts with difficulty filter' })
})

// POST a new workout
router.post('/', createWorkout)

// Schedule a workout
router.post('/schedule', scheduleWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router;
