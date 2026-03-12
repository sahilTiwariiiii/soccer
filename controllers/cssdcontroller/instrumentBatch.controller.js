import InstrumentBatch from "../../models/cssdandsterilization/InstrumentBatch.js";
import InstrumentMaster from "../../models/cssdandsterilization/InstrumentMaster.js";

/* =================================
   1️⃣ Create Instrument Batch
================================= */
export const createInstrumentBatch = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { batchNumber, instruments, sterilizationDate, expiryDate } = req.body;

    // Check duplicate batchNumber in same branch
    const existing = await InstrumentBatch.findOne({ hospitalId, branchId, batchNumber });
    if (existing) {
      return res.status(400).json({ message: "Batch number already exists in this branch" });
    }

    // Optional: validate instruments exist
    for (let item of instruments) {
      const instExists = await InstrumentMaster.findOne({ _id: item.instrumentId, hospitalId, branchId });
      if (!instExists) return res.status(400).json({ message: `Instrument ${item.instrumentId} not found in this branch` });
    }

    const batch = await InstrumentBatch.create({
      hospitalId,
      branchId,
      batchNumber,
      instruments,
      sterilizationDate,
      expiryDate,
      sterilizationBy: userId,
    });

    res.status(201).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   2️⃣ Get All Batches (Filters)
================================= */
export const getInstrumentBatches = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { status, instrumentId } = req.query;

    const filter = { hospitalId, branchId };
    if (status) filter.status = status;
    if (instrumentId) filter["instruments.instrumentId"] = instrumentId;

    const batches = await InstrumentBatch.find(filter)
      .populate("instruments.instrumentId", "name category code")
      .populate("sterilizationBy", "name email")
      .sort({ createdAt: -1 });

    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   3️⃣ Get Single Batch
================================= */
export const getSingleInstrumentBatch = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const batch = await InstrumentBatch.findOne({ _id: req.params.id, hospitalId, branchId })
      .populate("instruments.instrumentId", "name category code")
      .populate("sterilizationBy", "name email");

    if (!batch) return res.status(404).json({ message: "Batch not found" });

    res.json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   4️⃣ Update Batch
================================= */
export const updateInstrumentBatch = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { batchNumber, instruments, sterilizationDate, expiryDate, status } = req.body;

    const updated = await InstrumentBatch.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      { batchNumber, instruments, sterilizationDate, expiryDate, status, sterilizationBy: userId },
      { new: true }
    ).populate("instruments.instrumentId", "name category code");

    if (!updated) return res.status(404).json({ message: "Batch not found or unauthorized" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   5️⃣ Delete Batch
================================= */
export const deleteInstrumentBatch = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const deleted = await InstrumentBatch.findOneAndDelete({ _id: req.params.id, hospitalId, branchId });

    if (!deleted) return res.status(404).json({ message: "Batch not found or unauthorized" });

    res.json({ message: "Instrument batch deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};