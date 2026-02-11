import express from 'express'
import dotenv from 'dotenv'
import { ConnectDb } from './db/database.js';
import UserRoute from './routes/UserRoute.js'
import PatientRegistrationAndVisitedRoute from './routes/PatientRegistrationAndVisitedRoute.js'
import clinicalDetailsRoute from './routes/clinicalDetailsRoute.js'
const app= express();
dotenv.config();
app.use(express.json());

ConnectDb();
app.use('/api/v1',UserRoute);
app.use('/api/v1',PatientRegistrationAndVisitedRoute);
app.use('/api/v1',clinicalDetailsRoute);
const port = process.env.PORT || 6000;
app.listen(port,()=>{
    console.log(`Server is running on Port ${port}`)
})