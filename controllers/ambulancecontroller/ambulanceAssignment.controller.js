import AmbulanceAssignment from "../models/ambulance/AmbulanceAssignment.js";
import AmbulanceMaster from "../models/ambulance/AmbulanceMaster.js";
import User from "../models/User.js";

/* =================================
   1️⃣ Create Assignment
================================= */
export const createAssignment = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { ambulanceId, driverId, startTime, endTime, status } = req.body;

    // Validate ambulance exists in this hospital/branch
    const ambulance = await AmbulanceMaster.findOne({ _id: ambulanceId, hospitalId, branchId });
    if (!ambulance) return res.status(404).json({ message: "Ambulance not found in this branch" });

    const assignment = await AmbulanceAssignment.create({
      hospitalId,
      branchId,
      ambulanceId,
      driverId,
      startTime,
      endTime,
      status: status || "Active",
      createdBy: userId
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   2️⃣ Update Assignment
================================= */
export const updateAssignment = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { startTime, endTime, status } = req.body;

    const updated = await AmbulanceAssignment.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      { startTime, endTime, status },
      { new: true }
    )
    .populate("ambulanceId")
    .populate("driverId", "name email")
    .populate("createdBy", "name email");

    if (!updated) return res.status(404).json({ message: "Assignment not found or unauthorized" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   3️⃣ Get All Assignments (Filters)
================================= */
export const getAssignments = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { ambulanceId, driverId, status } = req.query;

    const filter = { hospitalId, branchId };
    if (ambulanceId) filter.ambulanceId = ambulanceId;
    if (driverId) filter.driverId = driverId;
    if (status) filter.status = status;

    const assignments = await AmbulanceAssignment.find(filter)
      .populate("ambulanceId")
      .populate("driverId", "name email")
      .populate("createdBy", "name email")
      .sort({ startTime: -1 });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   4️⃣ Get Single Assignment
================================= */
export const getSingleAssignment = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const assignment = await AmbulanceAssignment.findOne({ _id: req.params.id, hospitalId, branchId })
      .populate("ambulanceId")
      .populate("driverId", "name email")
      .populate("createdBy", "name email");

    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   5️⃣ Delete Assignment
================================= */
export const deleteAssignment = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const deleted = await AmbulanceAssignment.findOneAndDelete({ _id: req.params.id, hospitalId, branchId });
    if (!deleted) return res.status(404).json({ message: "Assignment not found or unauthorized" });

    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};