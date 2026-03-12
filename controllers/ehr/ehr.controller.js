const PatientHistory = require('../models/ehr/PatientHistory');
const Prescription = require('../models/ehr/Prescription');

exports.createPatientHistory = async (req, res) => {
    try {
        const history = new PatientHistory(req.body);
        await history.save();
        res.status(201).send(history);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getPatientHistory = async (req, res) => {
    try {
        const history = await PatientHistory.find({ patient: req.params.patientId }).populate('author');
        res.send(history);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createPrescription = async (req, res) => {
    try {
        const prescription = new Prescription(req.body);
        await prescription.save();
        res.status(201).send(prescription);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patient: req.params.patientId }).populate('doctor');
        res.send(prescriptions);
    } catch (error) {
        res.status(500).send(error);
    }
};
