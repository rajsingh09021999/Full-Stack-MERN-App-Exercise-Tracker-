import mongoose from 'mongoose';
import 'dotenv/config';

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
    useNewUrlParser: true,
});

// Connection to the database
const db = mongoose.connection;

// Indicate that successfully connected to MongoDB
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true, enum: ['kgs', 'lbs'] },
    date: { type: Date, required: true } // Ensuring the date is stored as a Date object
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

// CRUD Operations 
const exercises = {
    async createExercise(name, reps, weight, unit, date) {
        const exercise = new Exercise({ name, reps, weight, unit, date });
        return await exercise.save();
    },

    async findExerciseById(id) {
        return await Exercise.findById(id);
    },

    async findAllExercises() {
        return await Exercise.find();
    },

    async updateExercise(id, name, reps, weight, unit, date) {
        return await Exercise.updateOne(
            { _id: id },
            { $set: { name, reps, weight, unit, date } },
            { new: true }
        );
    },

    async deleteExercise(id) {
        return await Exercise.deleteOne({ _id: id });
    }
};

export { exercises };
