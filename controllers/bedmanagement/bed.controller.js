import Ward from '../../models/bedmanagement/Ward.js';
import Bed from '../../models/bedmanagement/Bed.js';

export const createWard = async (req, res) => {
    try {
        const ward = new Ward(req.body);
        await ward.save();
        res.status(201).send(ward);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getWards = async (req, res) => {
    try {
        const wards = await Ward.find({});
        res.send(wards);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const createBed = async (req, res) => {
    try {
        const bed = new Bed(req.body);
        await bed.save();
        res.status(201).send(bed);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getBeds = async (req, res) => {
    try {
        const beds = await Bed.find({}).populate('ward').populate('patient');
        res.send(beds);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const assignBed = async (req, res) => {
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

export const dischargeBed = async (req, res) => {
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
