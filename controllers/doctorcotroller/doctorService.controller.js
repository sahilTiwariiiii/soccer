import { DoctorService } from "../../models/DoctorService.js";
import mongoose from "mongoose";

/* ================================
   ✅ Create Doctor Service Mapping
================================ */
export const createDoctorService = async (req, res) => {
  try {
    const { hospitalId, doctorId, services } = req.body;

    const existing = await DoctorService.findOne({ hospitalId, doctorId });

    if (existing) {
      return res.status(400).json({
        message: "Service mapping already exists for this doctor"
      });
    }

    const data = await DoctorService.create({
      hospitalId,
      doctorId,
      services
    });

    return res.status(201).json(data);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✅ Get All (Filters + Pagination)
================================ */
export const getAllDoctorServices = async (req, res) => {
  try {
    const {
      hospitalId,
      doctorId,
      serviceId,
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    if (hospitalId) filter.hospitalId = hospitalId;
    if (doctorId) filter.doctorId = doctorId;
    if (serviceId) filter.services = serviceId;

    const skip = (page - 1) * limit;

    const data = await DoctorService.find(filter)
      .populate("services")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await DoctorService.countDocuments(filter);

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
export const getDoctorServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const data = await DoctorService.findById(id)
      .populate("services");

    if (!data) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✅ Add Service to Doctor
================================ */
export const addServiceToDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceId } = req.body;

    const updated = await DoctorService.findByIdAndUpdate(
      id,
      { $addToSet: { services: serviceId } }, // prevents duplicate
      { new: true }
    ).populate("services");

    return res.status(200).json(updated);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✅ Remove Service from Doctor
================================ */
export const removeServiceFromDoctor = async (req, res) => {
  try {
    const { id, serviceId } = req.params;

    const updated = await DoctorService.findByIdAndUpdate(
      id,
      { $pull: { services: serviceId } },
      { new: true }
    ).populate("services");

    return res.status(200).json(updated);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✅ Update Full Record
================================ */
export const updateDoctorService = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await DoctorService.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).populate("services");

    if (!updated) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json(updated);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================================
   ✅ Delete
================================ */
export const deleteDoctorService = async (req, res) => {
  try {
    const { id } = req.params;

    await DoctorService.findByIdAndDelete(id);

    return res.status(200).json({ message: "Deleted successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};