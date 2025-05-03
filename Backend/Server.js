import express from 'express';
import cors from 'cors';
import connectDB from './src/Controllers/db.js';
import AccountCreation from './src/routes/Registration-route.js';
import AccountLogin from './src/routes/Login-route.js';
import NewTask from './src/routes/New-Task-Route.js';
import GetTasks from './src/routes/Get-Tasks-Route.js';
import DeleteTask from './src/routes/Delete-Task-Route.js';
const app = express();
app.use(express.json());
app.use(cors())

//creating account route
app.use('/api', AccountCreation);
//login route
app.use('/api', AccountLogin);
//New Tasks Route
app.use('/api', NewTask);
//Getting all tasks route
app.use('/api', GetTasks);
//Deleting a Task Route
app.use('/api', DeleteTask);
app.listen(5000, () => {
    console.log("Server is running on port 5000");
    connectDB();
})