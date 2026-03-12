const Ward = require('../../models/bedmanagement/Ward');
const Bed = require('../../models/bedmanagement/Bed');

exports.createWard = async (req, res) => {
    try {
        const ward = new Ward(req.body);
        await ward.save();
        res.status(201).send(ward);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getWards = async (req, res) => {
    try {
        const wards = await Ward.find({});
        res.send(wards);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createBed = async (req, res) => {
    try {
        const bed = new Bed(req.body);
        await bed.save();
        res.status(201).send(bed);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getBeds = async (req, res) => {
    try {
        const beds = await Bed.find({}).populate('ward').populate('patient');
        res.send(beds);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.assignBed = async (req, res) => {
    try {
        const bed = await Bed.findById(req.params.bedId);
        bed.isOccupied = true;
        bed.patient = req.body.patientId;
        await bed.save();
        res.send(bed);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.dischargeBed = async (req, res) => {
    try {
        const bed = await Bed.findById(req.params.bedId);
        bed.isOccupied = false;
        bed.patient = null;
        await bed.save();
        res.send(bed);
    } catch (error) {
        res.status(400).send(error);
    }
};
