import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';

function HomePage({ setExerciseToEdit }) {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);

    const onDelete = async id => {
        const response = await fetch(`/exercises/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with id = ${id}, status code = ${response.status}`);
        }
    };    

    const onEdit = exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        navigate("/edit-exercise");
    };

    const loadExercises = async () => {
        try {
            const response = await fetch('/exercises');
            const data = await response.json();
            setExercises(data);
        } catch (error) {
            console.error('Failed to fetch exercises:', error);
        }
    };

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit} />
        </>
    );
}

export default HomePage;

