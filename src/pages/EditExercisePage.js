import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({ exerciseToEdit }) => {
    const navigate = useNavigate();
    
    // Initialize form fields with exerciseToEdit values 
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(new Date(exerciseToEdit.date).toISOString().slice(0, 10));

    // Utility function to format date to MM-DD-YY
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${month}-${day}-${year.substring(2)}`;
    };

    const editExercise = async () => {
        // Format the date before sending
        const formattedDate = formatDate(date);
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name, 
                reps: parseInt(reps), 
                weight: parseInt(weight), 
                unit, 
                date: formattedDate,
            }),
        });
        if (response.status === 200) {
            alert("Exercise updated successfully!");
        } else {
            alert(`Failed to update the exercise, status code = ${response.status}`);
        }
        navigate('/');
    };
    
    return (
        <div>
            <h1>Edit Exercise</h1>
            {/* Form inputs for exercise properties */}
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="number" placeholder="Reps" value={reps} onChange={e => setReps(e.target.value)} />
            <input type="number" placeholder="Weight" value={weight} onChange={e => setWeight(e.target.value)} />
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <button onClick={editExercise}>Save</button>
        </div>
    );
};

export default EditExercisePage;
