import express from 'express'
import { PatientRegisterController } from '../controllers/patientRegisterController.js';
const router = express.Router();

router.post('/patient-register',PatientRegisterController);
export default router;