// controllers/bloodDonor.controller.js
import BloodDonor from "../../models/bloodbank/BloodDonor.js";

// CREATE Donor
export const createBloodDonor = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const {
      donorId,
      firstName,
      lastName,
      gender,
      dob,
      phone,
      email,
      address,
      bloodGroup,
      weight,
      hemoglobin,
    } = req.body;

    if (!donorId) {
      return res.status(400).json({ message: "Donor ID is required" });
    }

    const existing = await BloodDonor.findOne({
      donorId,
      hospitalId,
    });

    if (existing) {
      return res.status(400).json({ message: "Donor ID already exists" });
    }

    const donor = await BloodDonor.create({
      hospitalId,
      branchId,
      donorId,
      firstName,
      lastName,
      gender,
      dob,
      phone,
      email,
      address,
      bloodGroup,
      weight,
      hemoglobin,
    });

    return res.status(201).json({
      message: "Blood donor created successfully",
      data: donor,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// GET All Donors (With Filters)
export const getAllBloodDonors = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const { bloodGroup, status, search } = req.query;

    const filter = {
      hospitalId,
      branchId,
    };

    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (status) filter.status = status;

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { donorId: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const donors = await BloodDonor.find(filter)
      .populate("bloodGroup")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: donors.length,
      data: donors,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// GET Single Donor
export const getBloodDonorById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const donor = await BloodDonor.findOne({
      _id: id,
      hospitalId,
      branchId,
    }).populate("bloodGroup");

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    return res.status(200).json({ data: donor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// UPDATE Donor
export const updateBloodDonor = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const donor = await BloodDonor.findOneAndUpdate(
      { _id: id, hospitalId, branchId },
      req.body,
      { new: true }
    );

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    return res.status(200).json({
      message: "Donor updated successfully",
      data: donor,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// DELETE Donor (Soft Delete Recommended)
export const deleteBloodDonor = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const donor = await BloodDonor.findOneAndDelete({
      _id: id,
      hospitalId,
      branchId,
    });

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    return res.status(200).json({
      message: "Donor deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};