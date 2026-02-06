import express from 'express'
import { PatientRegisterController } from '../controllers/patientRegister.js';
const router=express.Router();

router.post('/patient-register',PatientRegisterController);
export default router;