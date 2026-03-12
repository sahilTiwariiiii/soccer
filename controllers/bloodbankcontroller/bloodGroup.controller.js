// controllers/bloodGroup.controller.js
import BloodGroup from "../../models/bloodbank/BloodGroup.js";

// CREATE Blood Group
export const createBloodGroup = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Blood group name is required" });
    }

    const existing = await BloodGroup.findOne({ name });

    if (existing) {
      return res.status(400).json({ message: "Blood group already exists" });
    }

    const bloodGroup = await BloodGroup.create({ name });

    return res.status(201).json({
      message: "Blood group created successfully",
      data: bloodGroup,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET All Blood Groups
export const getAllBloodGroups = async (req, res) => {
  try {
    const bloodGroups = await BloodGroup.find().sort({ name: 1 });

    return res.status(200).json({
      count: bloodGroups.length,
      data: bloodGroups,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET Single Blood Group
export const getBloodGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const bloodGroup = await BloodGroup.findById(id);

    if (!bloodGroup) {
      return res.status(404).json({ message: "Blood group not found" });
    }

    return res.status(200).json({ data: bloodGroup });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE Blood Group
export const updateBloodGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existing = await BloodGroup.findOne({ name });

    if (existing && existing._id.toString() !== id) {
      return res.status(400).json({ message: "Blood group already exists" });
    }

    const updated = await BloodGroup.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Blood group not found" });
    }

    return res.status(200).json({
      message: "Blood group updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE Blood Group
export const deleteBloodGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await BloodGroup.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Blood group not found" });
    }

    return res.status(200).json({
      message: "Blood group deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};