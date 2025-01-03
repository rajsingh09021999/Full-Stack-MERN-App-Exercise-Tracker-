import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';

function Exercise({ exercise, onDelete, onEdit }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        onDelete(exercise._id);
    };

    const handleEdit = () => {
        onEdit(exercise);
        navigate(`/edit-exercise/${exercise._id}`);
    };

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{new Date(exercise.date).toLocaleDateString()}</td>
            <td onClick={handleEdit}><MdEdit /></td>
            <td onClick={handleDelete}><MdDelete /></td>
        </tr>
    );
}

export default Exercise;

