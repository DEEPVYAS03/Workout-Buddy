const express = require('express');
const workoutRoutes = require('./routes/workouts')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors());

require('dotenv').config()

app.use(express.json())

// app.use(express.json()) is used to parse the incoming requests to json format

//middleware
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=>
    {
        app.listen(process.env.PORT,()=>{
            console.log('Server running on port 5000')
        })
    }
)  
.catch(err=>console.log(err))


//routes 
app.use('/api/workouts',workoutRoutes)
//grabs all the routes from the workouts.js file
// /api/workouts is the prefix for all the routes in the workouts.js file





//env variable to make it keep hidden
