import IPDDailyNote from "../../models/ipdmanagement/IPDDailyNote.js";
import IPDAdmission from "../../models/ipdmanagement/IPDAdmission.js";

/* =================================
   1️⃣ Create Daily Note
================================= */
export const createIPDDailyNote = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { ipdId, note } = req.body;

    // Validate IPD belongs to same hospital & branch
    const ipdExists = await IPDAdmission.findOne({
      _id: ipdId,
      hospitalId,
      branchId,
    });

    if (!ipdExists) {
      return res.status(404).json({ message: "IPD Admission not found" });
    }

    const dailyNote = await IPDDailyNote.create({
      hospitalId,
      branchId,
      ipdId,
      doctorId: userId,
      note,
    });

    res.status(201).json(dailyNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   2️⃣ Get All Notes (With Filters)
================================= */
export const getIPDDailyNotes = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { ipdId, doctorId, fromDate, toDate } = req.query;

    const filter = {
      hospitalId,
      branchId,
    };

    if (ipdId) filter.ipdId = ipdId;
    if (doctorId) filter.doctorId = doctorId;

    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    const notes = await IPDDailyNote.find(filter)
      .populate("doctorId", "name email")
      .populate("ipdId")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   3️⃣ Get Single Note
================================= */
export const getSingleIPDDailyNote = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const note = await IPDDailyNote.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    })
      .populate("doctorId", "name email")
      .populate("ipdId");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   4️⃣ Update Note (Only Same Doctor)
================================= */
export const updateIPDDailyNote = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const updated = await IPDDailyNote.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
        doctorId: userId, // only creator doctor can edit
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
   5️⃣ Delete Note (Optional)
================================= */
export const deleteIPDDailyNote = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const deleted = await IPDDailyNote.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
      doctorId: userId, // only creator can delete
    });

    if (!deleted) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};