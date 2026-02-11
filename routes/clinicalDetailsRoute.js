import express from 'express';
import { createAddiction, createPatientPastMedicalHistory, createPatientPastSurgicalHistory, deleteById, deleteMultiple, deleteMultiplePatientPastMedicalHistory, deleteMultipleSurgicalHistory, deletePatientPastMedicalHistoryById, deleteSurgicalHistoryById, getPatientAddiction, PatientPastMedicalHistory, PatientPastSurgicalHistory, updateAddiction, updatePatientPastMedicalHistory, updateSurgicalHistory } from '../controllers/clinicalDetailsController.js';
const router=express.Router();
// Create Addiction
router.post("/addiction",createAddiction);
// Update Addiction
router.put("/addiction/:id",updateAddiction);
// Delete Addiction by id
router.delete("/addiction/:id",deleteById);
// Delete multiple addiction
router.delete("/addiction",deleteMultiple);
// Get All Addiction history of the Patient
router.get('/addiction/:patientId',getPatientAddiction);
// Get all Patient Clinical Details ( Addiction+ Complaints + PastMedicalHistory + PastSurgicalHistory + Personal History) of the particular patients get all these details from one controller only 
// router.get('/all-clinical-details/');
router.post("/surgical",createPatientPastSurgicalHistory);
router.get("/surgical/:patientId",PatientPastSurgicalHistory);
router.put("/surgical/:id",updateSurgicalHistory);
// Delete Addiction by id
router.delete("/surgical/:id",deleteSurgicalHistoryById);
// Delete multiple addiction
router.delete("/surgical",deleteMultipleSurgicalHistory);
// Medical History

// get all Medical History
router.get('/medical/:patientId',PatientPastMedicalHistory);
// Create Medical History
router.post('/medical',createPatientPastMedicalHistory);
// Update Medical History
router.put('/medical/:id',updatePatientPastMedicalHistory);
// Delete Medical History by Id
router.delete('/medical/:id',deletePatientPastMedicalHistoryById);
// Delete all
router.delete('/medical',deleteMultiplePatientPastMedicalHistory);

export default router;