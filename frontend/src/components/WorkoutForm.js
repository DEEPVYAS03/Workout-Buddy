import {useState} from 'react';

import { useWorkoutsContext } from  '../hooks/useWorkoutsContext';


const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const {dispatch} = useWorkoutsContext()
    


    const handleSubmit = async(e) => {
        e.preventDefault()
        const workout = {title, load, reps}
        const response = await fetch('http://localhost:5000/api/workouts/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workout)
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){

            setTitle('')
            setLoad('')
            setReps('')
            setError('')
            setError(null)
            console.log('New workout added',json)
            dispatch({type:'CREATE_WORKOUT',payload:json})
        }
    }

  return (
    <form action=""onSubmit={handleSubmit} className="create">

    <h3>Add a new Workout</h3>

    <label htmlFor="">Exercise Title:</label>

    <input type="text"  value={title} onChange={(e) => setTitle(e.target.value)}
    className={emptyFields.includes('title') ? 'error' : ''}
    />

    <label htmlFor="">Load (kg):</label>
    <input type="number"  value={load} onChange={(e) => setLoad(e.target.value)}/>
    <label htmlFor="">Reps:</label>

    <input type="number"  value={reps} onChange={(e) => setReps(e.target.value)}/>
    {error && <div className="error">{error}</div>}

    <button>Add Workout</button>
    </form>
  )
}
export default WorkoutForm