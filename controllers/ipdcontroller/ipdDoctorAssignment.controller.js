import IPDDoctorAssignment from "../models/IPDDoctorAssignment.js";
import IPDAdmission from "../models/IPDAdmission.js";

/* =================================
   1️⃣ Assign Doctor To IPD
================================= */
export const assignDoctorToIPD = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { ipdAdmissionId, doctorId, role } = req.body;

    // Validate IPD exists in same hospital & branch
    const ipd = await IPDAdmission.findOne({
      _id: ipdAdmissionId,
      hospitalId,
      branchId,
    });

    if (!ipd) {
      return res.status(404).json({ message: "IPD Admission not found" });
    }

    // Prevent duplicate doctor assignment
    const alreadyAssigned = await IPDDoctorAssignment.findOne({
      hospitalId,
      branchId,
      ipdAdmissionId,
      doctorId,
    });

    if (alreadyAssigned) {
      return res.status(400).json({ message: "Doctor already assigned" });
    }

    const assignment = await IPDDoctorAssignment.create({
      hospitalId,
      branchId,
      ipdAdmissionId,
      doctorId,
      role,
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   2️⃣ Get All Assignments (Filters)
================================= */
export const getIPDDoctorAssignments = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { ipdAdmissionId, doctorId, role } = req.query;

    const filter = { hospitalId, branchId };

    if (ipdAdmissionId) filter.ipdAdmissionId = ipdAdmissionId;
    if (doctorId) filter.doctorId = doctorId;
    if (role) filter.role = role;

    const assignments = await IPDDoctorAssignment.find(filter)
      .populate("doctorId", "name email")
      .populate("ipdAdmissionId")
      .sort({ createdAt: -1 });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   3️⃣ Get Doctors For One IPD
================================= */
export const getDoctorsForIPD = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const assignments = await IPDDoctorAssignment.find({
      hospitalId,
      branchId,
      ipdAdmissionId: req.params.ipdId,
    }).populate("doctorId", "name email");

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   4️⃣ Update Doctor Role
================================= */
export const updateDoctorRole = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { role } = req.body;

    const updated = await IPDDoctorAssignment.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
      },
      { role },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   5️⃣ Remove Doctor From IPD
================================= */
export const removeDoctorFromIPD = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const deleted = await IPDDoctorAssignment.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({ message: "Doctor removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};