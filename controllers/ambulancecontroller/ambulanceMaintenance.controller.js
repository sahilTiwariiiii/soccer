import AmbulanceMaintenance from "../../models/ambulance/AmbulanceMaintenance.js";
import AmbulanceMaster from "../../models/ambulance/AmbulanceMaster.js";
import User from "../../models/User.js";

/* =================================
   1️⃣ Create Maintenance Record
================================= */
export const createMaintenance = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { ambulanceId, maintenanceDate, type, description, cost, performedBy } = req.body;

    // Validate ambulance exists in this hospital/branch
    const ambulance = await AmbulanceMaster.findOne({ _id: ambulanceId, hospitalId, branchId });
    if (!ambulance) return res.status(404).json({ message: "Ambulance not found in this branch" });

    const maintenance = await AmbulanceMaintenance.create({
      hospitalId,
      branchId,
      ambulanceId,
      maintenanceDate: maintenanceDate || new Date(),
      type: type || "Routine",
      description,
      cost,
      performedBy: performedBy || userId
    });

    res.status(201).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   2️⃣ Update Maintenance Record
================================= */
export const updateMaintenance = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { maintenanceDate, type, description, cost, performedBy } = req.body;

    const updated = await AmbulanceMaintenance.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      { maintenanceDate, type, description, cost, performedBy: performedBy || userId },
      { new: true }
    )
    .populate("ambulanceId")
    .populate("performedBy", "name email");

    if (!updated) return res.status(404).json({ message: "Maintenance record not found or unauthorized" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   3️⃣ Get All Maintenance Records (with Filters)
================================= */
export const getMaintenances = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { ambulanceId, type, performedBy } = req.query;

    const filter = { hospitalId, branchId };
    if (ambulanceId) filter.ambulanceId = ambulanceId;
    if (type) filter.type = type;
    if (performedBy) filter.performedBy = performedBy;

    const records = await AmbulanceMaintenance.find(filter)
      .populate("ambulanceId")
      .populate("performedBy", "name email")
      .sort({ maintenanceDate: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   4️⃣ Get Single Maintenance Record
================================= */
export const getSingleMaintenance = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const record = await AmbulanceMaintenance.findOne({ _id: req.params.id, hospitalId, branchId })
      .populate("ambulanceId")
      .populate("performedBy", "name email");

    if (!record) return res.status(404).json({ message: "Maintenance record not found" });

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   5️⃣ Delete Maintenance Record
================================= */
export const deleteMaintenance = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const deleted = await AmbulanceMaintenance.findOneAndDelete({ _id: req.params.id, hospitalId, branchId });
    if (!deleted) return res.status(404).json({ message: "Maintenance record not found or unauthorized" });

    res.json({ message: "Maintenance record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};