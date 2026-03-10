import express from 'express'
import { PatientRegisterController } from '../controllers/patientRegisterController.js';
import authMiddleware from '../middlewares/auth.js';
const router = express.Router();

router.post('/patient-register', authMiddleware, PatientRegisterController);
export default router;