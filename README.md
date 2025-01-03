### README: MERN Stack Exercise Tracker

#### **Project Overview**

This project is a **Single Page Application (SPA)** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The application allows users to track exercises, including details such as repetitions, weight, and date. It consists of a RESTful API backend and a React-based frontend to manage and display exercise data.

The project implements full CRUD functionality, adheres to best practices for API design, and provides a responsive and user-friendly interface.

#### **Features**

1. **Frontend (React.js)**:
   - Dynamic SPA with function-based components.
   - Responsive and user-friendly design.
   - Integration with REST API for CRUD operations.
   - Pages include:
     - **Home Page**: Displays all exercises in a styled table with options to edit or delete entries.
     - **Edit Exercise Page**: Allows users to update existing exercise details.
     - **Create Exercise Page**: Enables users to add new exercises.

2. **Backend (REST API)**:
   - Fully-featured RESTful API with endpoints for CRUD operations:
     - **POST /exercises**: Create a new exercise.
     - **GET /exercises**: Retrieve all exercises.
     - **GET /exercises/:_id**: Retrieve a specific exercise by ID.
     - **PUT /exercises/:_id**: Update an existing exercise by ID.
     - **DELETE /exercises/:_id**: Delete an exercise by ID.
   - Input validation to ensure data integrity.
   - Uses MongoDB for persistent data storage.

#### **Technology Stack**

- **Frontend**:
  - React.js
  - React Router (for navigation)
  - Axios or Fetch API (for API requests)
  - React Icons library (for intuitive actions)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose (for database interaction)

#### **Setup Instructions**

##### Prerequisites:
- Node.js and npm installed.
- MongoDB installed and running locally or on a cloud service.
- Environment variables configured in `.env` files.

#### **Installation and Usage**

1. **Backend**:
   - Navigate to the backend folder.
   - Run `npm install` to install dependencies.
   - Create a `.env` file with the following variables:
     ```
     PORT=3000
     MONGODB_CONNECT_STRING=<your-mongo-db-connection-string>
     ```
   - Start the server with `npm start`.
   - The backend will be accessible at `http://localhost:3000`.

2. **Frontend**:
   - Navigate to the frontend folder.
   - Run `npm install` to install dependencies.
   - Create a `.env` file with the following variable:
     ```
     PORT=8000
     ```
   - Add the following to `package.json`:
     ```json
     "proxy": "http://localhost:3000"
     ```
   - Start the development server with `npm start`.
   - Open [http://localhost:8000](http://localhost:8000) to access the application.

#### **Application Workflow**

1. **Home Page**:
   - Displays a table with all exercises stored in the database.
   - Each row includes:
     - Exercise details (name, reps, weight, unit, date).
     - Edit and delete icons.
   - Provides a link to the Create Exercise Page.

2. **Create Exercise Page**:
   - Allows users to add a new exercise by filling out a form.
   - Validates inputs (e.g., numeric values for reps and weight, valid date format).
   - On successful submission:
     - Displays a success message.
     - Redirects back to the Home Page.

3. **Edit Exercise Page**:
   - Pre-populates form fields with the selected exercise’s details.
   - Validates inputs and updates the exercise in the database.
   - On success:
     - Displays a success message.
     - Redirects to the Home Page.

#### **Data Model**

Each document in the MongoDB `exercises` collection includes:

| Property | Data Type | Description                                       |
|----------|-----------|---------------------------------------------------|
| `name`   | String    | Name of the exercise (required, at least 1 char). |
| `reps`   | Number    | Number of repetitions (integer, >0).             |
| `weight` | Number    | Weight used (integer, >0).                       |
| `unit`   | String    | Unit of weight (`kgs` or `lbs`).                 |
| `date`   | String    | Date in the format MM-DD-YY.                     |

#### **Validation**

- **Backend**:
  - Validates inputs for `name`, `reps`, `weight`, `unit`, and `date` using express-validator or custom logic.
  - Returns appropriate status codes (e.g., 400 for bad requests, 404 for not found).

- **Frontend**:
  - Ensures users provide valid data before sending requests to the backend.

#### **Technical Details**

1. **Environment Variables**:
   - Used for sensitive data such as the MongoDB connection string.

2. **React Components**:
   - Function-based and modular.
   - Use React Router for seamless navigation.
   - Custom components for tables, rows, forms, and navigation.

3. **Styling**:
   - Custom styles in `App.css` to enhance UI/UX.
   - Styled HTML table and forms for consistency.

#### **Deployment**

- Deploy the React frontend to a static hosting service like Netlify or Vercel.
- Deploy the Node.js backend to a cloud platform like Heroku.
- Connect the MongoDB database using a cloud-hosted service like MongoDB Atlas.

#### **Future Enhancements**

- Add user authentication and authorization (e.g., JWT).
- Implement advanced filtering and sorting on the Home Page.
- Add tests for both frontend (e.g., React Testing Library) and backend (e.g., Jest).
- Support additional exercise attributes (e.g., duration, category).

