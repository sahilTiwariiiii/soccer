import IPDNursingNote from "../models/IPDNursingNote.js";
import IPDAdmission from "../models/IPDAdmission.js";

/* =================================
   1️⃣ Create Nursing Note
================================= */
export const createIPDNursingNote = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { ipdId, note } = req.body;

    // Validate IPD exists in same hospital & branch
    const ipd = await IPDAdmission.findOne({
      _id: ipdId,
      hospitalId,
      branchId,
    });

    if (!ipd) {
      return res.status(404).json({ message: "IPD Admission not found" });
    }

    const nursingNote = await IPDNursingNote.create({
      hospitalId,
      branchId,
      ipdId,
      nurseId: userId,
      note,
    });

    res.status(201).json(nursingNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   2️⃣ Get All Nursing Notes (Filters)
================================= */
export const getIPDNursingNotes = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { ipdId, nurseId, fromDate, toDate } = req.query;

    const filter = { hospitalId, branchId };

    if (ipdId) filter.ipdId = ipdId;
    if (nurseId) filter.nurseId = nurseId;

    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    const notes = await IPDNursingNote.find(filter)
      .populate("nurseId", "name email")
      .populate("ipdId")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   3️⃣ Get Single Nursing Note
================================= */
export const getSingleIPDNursingNote = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const note = await IPDNursingNote.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    })
      .populate("nurseId", "name email")
      .populate("ipdId");

    if (!note) {
      return res.status(404).json({ message: "Nursing note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   4️⃣ Update Nursing Note (Only Creator)
================================= */
export const updateIPDNursingNote = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const updated = await IPDNursingNote.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
        nurseId: userId,
      },
      { note: req.body.note },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   5️⃣ Delete Nursing Note (Only Creator)
================================= */
export const deleteIPDNursingNote = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const deleted = await IPDNursingNote.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
      nurseId: userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.json({ message: "Nursing note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};