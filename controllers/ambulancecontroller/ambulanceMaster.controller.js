import AmbulanceMaster from "../models/ambulance/AmbulanceMaster.js";
import User from "../models/User.js"; // for populating driver

/* =================================
   1️⃣ Create Ambulance
================================= */
export const createAmbulance = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { vehicleNumber, type, driverId, contactNumber, isActive } = req.body;

    // Check duplicate vehicle number in same branch
    const existing = await AmbulanceMaster.findOne({ hospitalId, branchId, vehicleNumber });
    if (existing) return res.status(400).json({ message: "Vehicle number already exists in this branch" });

    const ambulance = await AmbulanceMaster.create({
      hospitalId,
      branchId,
      vehicleNumber,
      type,
      driverId,
      contactNumber,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json(ambulance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   2️⃣ Get All Ambulances (with filters)
================================= */
export const getAmbulances = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { type, driverId, isActive } = req.query;

    const filter = { hospitalId, branchId };
    if (type) filter.type = type;
    if (driverId) filter.driverId = driverId;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const ambulances = await AmbulanceMaster.find(filter)
      .populate("driverId", "name email")
      .sort({ createdAt: -1 });

    res.json(ambulances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   3️⃣ Get Single Ambulance
================================= */
export const getSingleAmbulance = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const ambulance = await AmbulanceMaster.findOne({ _id: req.params.id, hospitalId, branchId })
      .populate("driverId", "name email");

    if (!ambulance) return res.status(404).json({ message: "Ambulance not found" });

    res.json(ambulance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   4️⃣ Update Ambulance
================================= */
export const updateAmbulance = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { vehicleNumber, type, driverId, contactNumber, isActive } = req.body;

    const updated = await AmbulanceMaster.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      { vehicleNumber, type, driverId, contactNumber, isActive },
      { new: true }
    ).populate("driverId", "name email");

    if (!updated) return res.status(404).json({ message: "Ambulance not found or unauthorized" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   5️⃣ Delete Ambulance
================================= */
export const deleteAmbulance = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const deleted = await AmbulanceMaster.findOneAndDelete({ _id: req.params.id, hospitalId, branchId });

    if (!deleted) return res.status(404).json({ message: "Ambulance not found or unauthorized" });

    res.json({ message: "Ambulance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};