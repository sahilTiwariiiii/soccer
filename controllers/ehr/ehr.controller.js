import PatientHistory from '../../models/ehr/PatientHistory.js';
import Prescription from '../../models/ehr/Prescription.js';

export const createPatientHistory = async (req, res) => {
    try {
        const history = new PatientHistory(req.body);
        await history.save();
        res.status(201).send(history);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPatientHistory = async (req, res) => {
    try {
        const history = await PatientHistory.find({ patient: req.params.patientId }).populate('author');
        res.send(history);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const createPrescription = async (req, res) => {
    try {
        const prescription = new Prescription(req.body);
        await prescription.save();
        res.status(201).send(prescription);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patient: req.params.patientId }).populate('doctor');
        res.send(prescriptions);
    } catch (error) {
        res.status(500).send(error);
    }
};
