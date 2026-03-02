import InstrumentMaster from "../models/CSSD/InstrumentMaster.js";

/* =================================
   1️⃣ Create Instrument
================================= */
export const createInstrument = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { name, category, code } = req.body;

    // Check duplicate code in same hospital+branch
    const existing = await InstrumentMaster.findOne({ hospitalId, branchId, code });
    if (existing) {
      return res.status(400).json({ message: "Instrument code already exists in this branch" });
    }

    const instrument = await InstrumentMaster.create({
      hospitalId,
      branchId,
      name,
      category,
      code,
      createdBy: userId,
    });

    res.status(201).json(instrument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   2️⃣ Get All Instruments (With Filters)
================================= */
export const getInstruments = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { category, isActive } = req.query;

    const filter = { hospitalId, branchId };
    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const instruments = await InstrumentMaster.find(filter).sort({ name: 1 });
    res.json(instruments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   3️⃣ Get Single Instrument
================================= */
export const getSingleInstrument = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const instrument = await InstrumentMaster.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!instrument) {
      return res.status(404).json({ message: "Instrument not found" });
    }

    res.json(instrument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   4️⃣ Update Instrument
================================= */
export const updateInstrument = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { name, category, code, isActive } = req.body;

    const updated = await InstrumentMaster.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      { name, category, code, isActive },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Instrument not found or unauthorized" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   5️⃣ Delete Instrument
================================= */
export const deleteInstrument = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const deleted = await InstrumentMaster.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Instrument not found or unauthorized" });
    }

    res.json({ message: "Instrument deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};