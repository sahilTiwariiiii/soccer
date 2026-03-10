import IPDAdmission from "../../models/ipdmanagement/IPDAdmission.js";
import Bed from "../../models/branches/BedSchema.js";
import PatientVisit from "../../models/PatientVisitSchema.js";
import { generateAdmissionNumber } from "../../services/generateAdmissionNumber.service.js";

/* ===============================
   1️⃣ Create IPD Admission
================================ */
export const createIPDAdmission = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      patientId,
      visitId, // This now comes from the pre-created visit
      admissionNumber,
      bedId,
      treatingDoctors,
    } = req.body;

    // 1. Generate Admission Number if not provided
    const ipn = admissionNumber || (await generateAdmissionNumber());

    // 2. Check if bed is available
    if (bedId) {
      const bed = await Bed.findById(bedId);
      if (!bed) return res.status(404).json({ message: "Bed not found" });
      if (bed.status !== "Available") {
        return res.status(400).json({ message: `Bed is already ${bed.status}` });
      }

      // Update Bed Status to Occupied
      bed.status = "Occupied";
      await bed.save();
    }

    // 3. Update Patient Visit Status to In Progress
    await PatientVisit.findByIdAndUpdate(visitId, { status: "In Progress" });

    // 4. Create the Admission
    const admission = await IPDAdmission.create({
      hospitalId,
      branchId,
      patientId,
      visitId,
      admissionNumber: ipn,
      bedId,
      treatingDoctors,
    });

    res.status(201).json({
      message: "Patient admitted successfully",
      admission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   2️⃣ Get All Admissions (Filters)
================================ */
export const getIPDAdmissions = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const { status, patientId, fromDate, toDate } = req.query;

    const filter = {
      hospitalId,
      branchId,
    };

    if (status) filter.status = status;
    if (patientId) filter.patientId = patientId;

    if (fromDate || toDate) {
      filter.admissionDate = {};
      if (fromDate) filter.admissionDate.$gte = new Date(fromDate);
      if (toDate) filter.admissionDate.$lte = new Date(toDate);
    }

    const admissions = await IPDAdmission.find(filter)
      .populate("patientId")
      .populate("visitId")
      .populate("bedId")
      .populate("treatingDoctors")
      .sort({ createdAt: -1 });

    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   3️⃣ Get Single Admission
================================ */
export const getSingleIPDAdmission = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const admission = await IPDAdmission.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    })
      .populate("patientId")
      .populate("visitId")
      .populate("bedId")
      .populate("treatingDoctors");

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   4️⃣ Update Admission
================================ */
export const updateIPDAdmission = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const updated = await IPDAdmission.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
      },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   5️⃣ Discharge Patient
================================ */
export const dischargeIPDPatient = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const { dischargeSummary } = req.body;

    const admission = await IPDAdmission.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
      status: "ADMITTED",
    });

    if (!admission) {
      return res.status(404).json({ message: "Admission not found or already discharged" });
    }

    // Update Bed Status to Cleaning
    if (admission.bedId) {
      await Bed.findByIdAndUpdate(admission.bedId, { status: "Cleaning" });
    }

    // Update Patient Visit Status to Completed
    await PatientVisit.findByIdAndUpdate(admission.visitId, { status: "Completed" });

    // Update Admission status
    admission.status = "DISCHARGED";
    admission.dischargeDate = new Date();
    admission.dischargeSummary = dischargeSummary;
    await admission.save();

    res.json({
      message: "Patient discharged successfully",
      admission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   6️⃣ Delete Admission (Optional)
================================ */
export const deleteIPDAdmission = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const admission = await IPDAdmission.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
      status: "ADMITTED", // safety: don't delete discharged
    });

    if (!admission) {
      return res.status(404).json({ message: "Cannot delete discharged admission" });
    }

    res.json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};