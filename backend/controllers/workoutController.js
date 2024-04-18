const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')
// get all workout

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 })
        res.status(200).send( workouts )

    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }
}


// get a single workout

const getWorkout = async (req, res) => {
    const { id } = req.params
    // check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({error: 'No such workout'})
    }
    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(400).send({error: 'Workout not found'})
    }

    res.status(200).send(workout)

}



// create new workout

const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).send({error:'Please fill in all the fields',emptyFields})
    }


    try {
        let workout = new Workout({ title, load, reps })
        await workout.save()
        res.status(200).send(workout )
    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }
}


// delete a workout

const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({error: 'No such workout'})
    }
    const workout = await Workout.findByIdAndDelete({_id:id})

    if(!workout){
        return res.status(400).send({error: 'Workout not found'})
    }

    res.status(200).send(workout)
}


// update a workout

const updateWorkout = async (req, res) => {
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({error: 'No such workout'})
    }
    
    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!workout){
        return res.status(400).send({error: 'Workout not found'})
    }

    res.status(200).send(workout)
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}