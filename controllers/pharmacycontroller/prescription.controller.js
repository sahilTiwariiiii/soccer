import Prescription from "../models/PrescriptionSchema.js";


// CREATE PRESCRIPTION (Doctor from Token)
const createPrescription = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const doctorId = req.user._id; // ✅ from token

    const {
      visitId,
      patientId,
      notesForPharmacy
    } = req.body;

    if (!visitId || !patientId) {
      return res.status(400).json({
        success: false,
        message: "Visit and Patient are required"
      });
    }

    const prescription = await Prescription.create({
      hospitalId,
      branchId,
      visitId,
      patientId,
      doctorId,
      notesForPharmacy,
      createdBy: doctorId
    });

    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      data: prescription
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// GET ALL PRESCRIPTIONS (FILTERED + Doctor Restriction)
const getPrescriptions = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const {
      status,
      patientId,
      fromDate,
      toDate,
      page = 1,
      limit = 10
    } = req.query;

    const filter = { hospitalId, branchId };

    if (status) filter.status = status;
    if (patientId) filter.patientId = patientId;

    // ✅ If logged-in user is Doctor, show only their prescriptions
    if (req.user.role === "Doctor") {
      filter.doctorId = req.user._id;
    }

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const prescriptions = await Prescription.find(filter)
      .populate("patientId", "patientName uhid")
      .populate("doctorId", "name")
      .populate("visitId", "visitNumber")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Prescription.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: prescriptions
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// GET BY ID (SECURE)
const getPrescriptionById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const filter = {
      _id: req.params.id,
      hospitalId,
      branchId
    };

    // Doctor restriction
    if (req.user.role === "Doctor") {
      filter.doctorId = req.user._id;
    }

    const prescription = await Prescription.findOne(filter)
      .populate("patientId", "patientName uhid age gender")
      .populate("doctorId", "name specialization")
      .populate("visitId", "visitNumber")
      .populate("createdBy", "name email");

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found"
      });
    }

    res.status(200).json({
      success: true,
      data: prescription
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// SEND TO PHARMACY
const sendToPharmacy = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const prescription = await Prescription.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found"
      });
    }

    if (prescription.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only Pending prescriptions can be sent"
      });
    }

    prescription.status = "SentToPharmacy";
    await prescription.save();

    res.status(200).json({
      success: true,
      message: "Prescription sent to pharmacy",
      data: prescription
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// MARK AS DISPENSED
const markAsDispensed = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const prescription = await Prescription.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found"
      });
    }

    if (
      prescription.status !== "SentToPharmacy" &&
      prescription.status !== "PartiallyDispensed"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status transition"
      });
    }

    prescription.status = "Dispensed";
    await prescription.save();

    res.status(200).json({
      success: true,
      message: "Prescription dispensed successfully",
      data: prescription
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// CANCEL PRESCRIPTION
const cancelPrescription = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const { cancellationReason } = req.body;

    const prescription = await Prescription.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found"
      });
    }

    if (prescription.status === "Dispensed") {
      return res.status(400).json({
        success: false,
        message: "Dispensed prescription cannot be cancelled"
      });
    }

    prescription.status = "Cancelled";
    prescription.cancellationReason = cancellationReason;

    await prescription.save();

    res.status(200).json({
      success: true,
      message: "Prescription cancelled successfully",
      data: prescription
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export default {
  createPrescription,
  getPrescriptions,
  getPrescriptionById,
  sendToPharmacy,
  markAsDispensed,
  cancelPrescription
};