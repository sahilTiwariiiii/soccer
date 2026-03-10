import PatientRegistration from "../models/PatientRegistration.js";
import PatientVisit from "../models/PatientVisitSchema.js";
import { generatepatientuhid } from "../services/generatepatientuhid.js";

export const listVisits = async (req, res) => {
  try {
    const { visitType, date } = req.query;
    const query = {};
    if (visitType) query.visitType = visitType;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.createdAt = { $gte: startDate, $lt: endDate };
    }

    const visits = await PatientVisit.find(query)
      .populate('patientId', 'uhid patientName')
      .populate('doctorId', 'name', 'User') // This should be 'User'
      .sort({ createdAt: -1 });

    return res.status(200).json({ data: visits });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const findPatient = async (req, res) => {
  try {
    const { uhid, mobile } = req.query;
    const query = {};
    if (uhid) query.uhid = uhid;
    if (mobile) query.mobile = mobile;

    if (Object.keys(query).length === 0) {
      return res.status(400).json({ message: "UHID or Mobile is required" });
    }

    const patient = await PatientRegistration.findOne(query);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const registerPatient = async (req, res) => {
  try {
    const { 
      mobile,
      email,
      patientName,
      gender,
      maritalStatus,
      dob,
      age,
      currentAge,
      relationType,
      guardianName,
      address,
      country,
      stateId,
      cityId,
      bloodGroup,
      source,
      referredDoctorId,
      referralMobile,
      patientImage 
    } = req.body;

    // 1. Check if patient already exists with mobile number
    const existingPatient = await PatientRegistration.findOne({ mobile });
    if (existingPatient) {
      return res.status(409).json({ message: "Patient with this mobile number already exists.", patient: existingPatient });
    }

    // 2. Generate a new UHID
    const uhid = await generatepatientuhid();

    // 3. Create the new patient record
    const newPatient = await PatientRegistration.create({
      uhid,
      mobile,
      email,
      patientName,
      gender,
      maritalStatus,
      dob,
      age,
      currentAge,
      relationType,
      guardianName,
      address,
      country,
      stateId,
      cityId,
      bloodGroup,
      source,
      referredDoctorId,
      referralMobile,
      patientImage
    });

    return res.status(201).json({ message: "Patient registered successfully", patient: newPatient });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};