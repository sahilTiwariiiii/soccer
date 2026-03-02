import InstrumentIssue from "../models/CSSD/InstrumentIssue.js";
import InstrumentBatch from "../models/CSSD/InstrumentBatch.js";

/* =================================
   1️⃣ Issue Instrument
================================= */
export const issueInstrument = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { batchId, issuedTo, issuedFor, issuedQuantity } = req.body;

    // Validate batch belongs to same hospital & branch
    const batch = await InstrumentBatch.findOne({ _id: batchId, hospitalId, branchId });
    if (!batch) return res.status(404).json({ message: "Instrument batch not found" });

    // Optional: Check if enough quantity in batch (sum of issued + existing stock logic)
    const issue = await InstrumentIssue.create({
      hospitalId,
      branchId,
      batchId,
      issuedTo,
      issuedFor,
      issuedQuantity,
      issuedAt: new Date(),
      status: "Issued",
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   2️⃣ Return Instrument
================================= */
export const returnInstrument = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const updated = await InstrumentIssue.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId, status: "Issued" },
      { status: "Returned", returnedAt: new Date(), returnedBy: userId },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Issued record not found or already returned" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   3️⃣ Get All Issued Instruments (Filters)
================================= */
export const getIssuedInstruments = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { batchId, issuedFor, status, issuedTo } = req.query;

    const filter = { hospitalId, branchId };
    if (batchId) filter.batchId = batchId;
    if (issuedFor) filter.issuedFor = issuedFor;
    if (status) filter.status = status;
    if (issuedTo) filter.issuedTo = issuedTo;

    const issuedRecords = await InstrumentIssue.find(filter)
      .populate("batchId")
      .populate("issuedTo", "name email")
      .populate("returnedBy", "name email")
      .sort({ issuedAt: -1 });

    res.json(issuedRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   4️⃣ Get Single Issued Record
================================= */
export const getSingleIssuedInstrument = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const record = await InstrumentIssue.findOne({ _id: req.params.id, hospitalId, branchId })
      .populate("batchId")
      .populate("issuedTo", "name email")
      .populate("returnedBy", "name email");

    if (!record) return res.status(404).json({ message: "Issued record not found" });

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   5️⃣ Update Issued Record (Rare)
================================= */
export const updateIssuedInstrument = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { issuedQuantity, issuedFor } = req.body;

    const updated = await InstrumentIssue.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      { issuedQuantity, issuedFor },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Issued record not found or unauthorized" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   6️⃣ Delete Issued Record (Rare)
================================= */
export const deleteIssuedInstrument = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const deleted = await InstrumentIssue.findOneAndDelete({ _id: req.params.id, hospitalId, branchId });

    if (!deleted) return res.status(404).json({ message: "Issued record not found or unauthorized" });

    res.json({ message: "Issued record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};