import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  // Define state for the exercise to edit
  const [exerciseToEdit, setExerciseToEdit] = useState(null);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Exercise Tracker</h1>
          <p>Keep track of your workouts and progress.</p>
        </header>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
          <Route path="/add-exercise" element={<CreateExercisePage />} />
          {/* Pass exerciseToEdit to EditExercisePage if needed */}
          <Route path="/edit-exercise/:id" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />} />
        </Routes>
        <footer>
          <p>© 2024 Rajveer Singh</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
