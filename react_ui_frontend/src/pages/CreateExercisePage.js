import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateExercisePage() {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const formatDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${month}-${day}-${year.substring(2)}`;
      };

    const addExercise = async () => {
        const formattedDate = formatDate(date);
        const exercise = {
            name,
            reps: parseInt(reps, 10),
            weight: parseInt(weight, 10),
            unit,
            date: formattedDate
        };

        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(exercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            alert("Successfully added the exercise!");
            navigate("/");
        } else {
            const error = await response.json();
            alert(`Failed to add exercise, status code = ${response.status}, error: ${error.Error || ''}`);
        }
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter exercise name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Enter repetitions"
                value={reps}
                onChange={e => setReps(e.target.value)}
            />
            <input
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={e => setWeight(e.target.value)}
            />
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <button onClick={addExercise}>Add</button>
        </div>
    );
}

export default CreateExercisePage;
