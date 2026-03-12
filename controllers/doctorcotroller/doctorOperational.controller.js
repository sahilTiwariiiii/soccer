import { DoctorOperational } from "../../models/DoctorOperational.js";
import mongoose from "mongoose";

/* ================================
   ✅ Create Doctor Operational
================================ */
export const createDoctorOperational = async (req, res) => {
  try {
    const { hospitalId, doctorId } = req.body;

    const existing = await DoctorOperational.findOne({ hospitalId, doctorId });
    if (existing) {
      return res.status(400).json({
        message: "Operational setup already exists for this doctor"
      });
    }

    const data = await DoctorOperational.create(req.body);

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✅ Get All (Filters + Pagination)
================================ */
export const getAllDoctorOperational = async (req, res) => {
  try {
    const {
      hospitalId,
      doctorId,
      branchId,
      dayOfWeek,
      leaveStatus,
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    if (hospitalId) filter.hospitalId = hospitalId;
    if (doctorId) filter.doctorId = doctorId;

    if (branchId) {
      filter.$or = [
        { "schedule.branchId": branchId },
        { "shifts.branchId": branchId }
      ];
    }

    if (dayOfWeek) {
      filter["schedule.dayOfWeek"] = Number(dayOfWeek);
    }

    if (leaveStatus) {
      filter["leaves.status"] = leaveStatus;
    }

    const skip = (page - 1) * limit;

    const data = await DoctorOperational.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await DoctorOperational.countDocuments(filter);

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

/* ================================
   ✅ Get By ID
================================ */
export const getDoctorOperationalById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const data = await DoctorOperational.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✅ Update Full Record
================================ */
export const updateDoctorOperational = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await DoctorOperational.findByIdAndUpdate(
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

/* ================================
   ✅ Add Schedule Entry
================================ */
export const addSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await DoctorOperational.findByIdAndUpdate(
      id,
      { $push: { schedule: req.body } },
      { new: true }
    );

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✅ Add Leave
================================ */
export const addLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await DoctorOperational.findByIdAndUpdate(
      id,
      { $push: { leaves: req.body } },
      { new: true }
    );

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✅ Update Leave Status
================================ */
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id, leaveId } = req.params;
    const { status } = req.body;

    const updated = await DoctorOperational.findOneAndUpdate(
      { _id: id, "leaves._id": leaveId },
      { $set: { "leaves.$.status": status } },
      { new: true }
    );

    return res.status(200).json(updated);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✅ Delete Record
================================ */
export const deleteDoctorOperational = async (req, res) => {
  try {
    const { id } = req.params;

    await DoctorOperational.findByIdAndDelete(id);

    return res.status(200).json({ message: "Deleted successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};