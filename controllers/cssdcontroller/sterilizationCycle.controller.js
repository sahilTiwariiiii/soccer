import SterilizationCycle from "../models/CSSD/SterilizationCycle.js";
import InstrumentBatch from "../models/CSSD/InstrumentBatch.js";

/* =================================
   1️⃣ Create Sterilization Cycle
================================= */
export const createSterilizationCycle = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { batchId, cycleNumber, machineUsed, startTime } = req.body;

    // Validate batch exists in this hospital/branch
    const batch = await InstrumentBatch.findOne({ _id: batchId, hospitalId, branchId });
    if (!batch) return res.status(404).json({ message: "Instrument batch not found" });

    const cycle = await SterilizationCycle.create({
      hospitalId,
      branchId,
      batchId,
      cycleNumber,
      machineUsed,
      startTime: startTime || new Date(),
      performedBy: userId,
      status: "Pending",
    });

    res.status(201).json(cycle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   2️⃣ Update Sterilization Cycle
================================= */
export const updateSterilizationCycle = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { endTime, status, machineUsed } = req.body;

    const updated = await SterilizationCycle.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      { endTime, status, machineUsed, performedBy: userId },
      { new: true }
    ).populate("batchId").populate("performedBy", "name email");

    if (!updated) return res.status(404).json({ message: "Sterilization cycle not found or unauthorized" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   3️⃣ Get All Cycles (With Filters)
================================= */
export const getSterilizationCycles = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { batchId, status } = req.query;

    const filter = { hospitalId, branchId };
    if (batchId) filter.batchId = batchId;
    if (status) filter.status = status;

    const cycles = await SterilizationCycle.find(filter)
      .populate("batchId")
      .populate("performedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(cycles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   4️⃣ Get Single Sterilization Cycle
================================= */
export const getSingleSterilizationCycle = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const cycle = await SterilizationCycle.findOne({ _id: req.params.id, hospitalId, branchId })
      .populate("batchId")
      .populate("performedBy", "name email");

    if (!cycle) return res.status(404).json({ message: "Sterilization cycle not found" });

    res.json(cycle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   5️⃣ Delete Sterilization Cycle
================================= */
export const deleteSterilizationCycle = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const deleted = await SterilizationCycle.findOneAndDelete({ _id: req.params.id, hospitalId, branchId });

    if (!deleted) return res.status(404).json({ message: "Sterilization cycle not found or unauthorized" });

    res.json({ message: "Sterilization cycle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};