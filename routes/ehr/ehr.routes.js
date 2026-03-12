const express = require('express');
const router = express.Router();
const ehrController = require('../controllers/ehr/ehr.controller');

router.post('/patient-history', ehrController.createPatientHistory);
router.get('/patient-history/:patientId', ehrController.getPatientHistory);
router.post('/prescriptions', ehrController.createPrescription);
router.get('/prescriptions/:patientId', ehrController.getPrescriptions);

module.exports = router;
