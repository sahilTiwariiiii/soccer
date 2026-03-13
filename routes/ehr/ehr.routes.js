import express from 'express';
import * as ehrController from '../../controllers/ehr/ehr.controller.js';
const router = express.Router();

router.post('/patient-history', ehrController.createPatientHistory);
router.get('/patient-history/:patientId', ehrController.getPatientHistory);
router.post('/prescriptions', ehrController.createPrescription);
router.get('/prescriptions/:patientId', ehrController.getPrescriptions);

export default router;
