const express = require('express');
const router = express.Router();
const Workout = require('../models/WorkoutModel')

const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}
 = require('../controllers/workoutController')

//GET all workouts
router.get('/',getWorkouts
)


// GET a single workout
router.get('/:id',getWorkout
)

// POST a workout
router.post('/',createWorkout)

// DELETE a workout
router.delete('/:id',deleteWorkout
)

// UPDATE a workout
router.patch('/:id',updateWorkout
)
//patch doesnt replace the whole object, just the parts that are changed
//put replaces the whole object

module.exports = router