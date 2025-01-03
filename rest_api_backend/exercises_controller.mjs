// Import necessary modules
import 'dotenv/config';
import { exercises } from './exercises_model.mjs';
import express from 'express';

// Define the port to run the server on and create an Express application
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

// Utility function for date validation
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

// Route to create a new exercise entry
app.post('/exercises', (req, res) => {
    const { name, reps, weight, unit, date } = req.body;

    // Validate the request body
    if (!name || name.trim().length === 0 ||
        typeof reps !== 'number' || reps <= 0 ||
        typeof weight !== 'number' || weight <= 0 ||
        !['kgs', 'lbs'].includes(unit) ||
        !isDateValid(date)) {
        // If the request body is invalid
        return res.status(400).json({ Error: "Invalid request" });
    }

    // Call the function from model layer to create a new exercise entry
    exercises.createExercise(name, reps, weight, unit, new Date(date))
        .then(exercise => {
            // Respond with the created exercise entry
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed due to server error' });
        });
});

// Route to get all exercises
app.get('/exercises', (req, res) => {
    exercises.findAllExercises()
        .then(exercises => {
            // Respond with all exercises or an empty array if none exist
            res.status(200).json(exercises);
        })
        // Assuming no need for error handling in this route as per assignment details
});

// Route to get exercise by id
app.get('/exercises/:id', (req, res) => {
    const exerciseId = req.params.id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise) {
                // If exercise exists, respond with the exercise data
                res.status(200).json(exercise);
            } else {
                // If no exercise found with the given ID, adhere to assignment error format
                res.status(404).json({ Error: "Not found" });
            }         
        })
        // No need for catch handling here, aligning with assignment error response details
});

// Route to update an existing exercise entry by ID
app.put('/exercises/:id', async (req, res) => {
    const exerciseId = req.params.id;
    const { name, reps, weight, unit, date } = req.body;

    // Perform request validation
    if (!name || name.trim().length === 0 ||
        typeof reps !== 'number' || reps <= 0 ||
        typeof weight !== 'number' || weight <= 0 ||
        !['kgs', 'lbs'].includes(unit) ||
        !isDateValid(date)) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    try {
        const result = await exercises.updateExercise(exerciseId, name, reps, weight, unit, new Date(date));
        if (result.modifiedCount === 1) {
            res.status(200).json({ _id: exerciseId, name, reps, weight, unit, date });
        } else {
            res.status(404).json({ Error: 'Not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: 'Server error' });
    }
});

// Route to delete an exercise by its ID
app.delete('/exercises/:id', (req, res) => {
    const exerciseId = req.params.id;
    exercises.deleteExercise(exerciseId)
        .then(result => {
            if (result.deletedCount === 1) {
                res.status(204).send(); // Respond with no content to indicate deletion
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ error: 'Request failed' });
        });
});

// Start the server to listen on a specified port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
