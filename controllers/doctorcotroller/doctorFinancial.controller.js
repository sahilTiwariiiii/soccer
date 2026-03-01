import { DoctorFinancial } from "../models/DoctorFinancial.js";
import mongoose from "mongoose";

// ✅ Create Doctor Financial
export const createDoctorFinancial = async (req, res) => {
  try {
    const { hospitalId, doctorId, consultationFees, commission } = req.body;

    const existing = await DoctorFinancial.findOne({ hospitalId, doctorId });
    if (existing) {
      return res.status(400).json({ message: "Financial setup already exists for this doctor in this hospital" });
    }

    const data = await DoctorFinancial.create({
      hospitalId,
      doctorId,
      consultationFees,
      commission
    });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Get All (with filters + pagination)
export const getAllDoctorFinancials = async (req, res) => {
  try {
    const {
      hospitalId,
      doctorId,
      branchId,
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    if (hospitalId) filter.hospitalId = hospitalId;
    if (doctorId) filter.doctorId = doctorId;

    if (branchId) {
      filter["consultationFees.branchId"] = branchId;
    }

    const skip = (page - 1) * limit;

    const data = await DoctorFinancial.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await DoctorFinancial.countDocuments(filter);

    return res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Get By ID
export const getDoctorFinancialById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const data = await DoctorFinancial.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Update
export const updateDoctorFinancial = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await DoctorFinancial.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json(updated);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Delete
export const deleteDoctorFinancial = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await DoctorFinancial.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({ message: "Record deleted successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};