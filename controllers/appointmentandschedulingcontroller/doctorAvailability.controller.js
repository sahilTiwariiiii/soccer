import DoctorAvailability from "../../models/appointmentandscheduling/DoctorAvailability.js";

// 🔹 Create Doctor Availability
export const createDoctorAvailability = async (req, res) => {
  try {
    const data = req.body;

    // Prevent duplicate entry for same doctor + day
    const existing = await DoctorAvailability.findOne({
      hospitalId: data.hospitalId,
      branchId: data.branchId,
      doctorId: data.doctorId,
      dayOfWeek: data.dayOfWeek,
      isActive: true
    });

    if (existing) {
      return res.status(400).json({
        message: "Availability already exists for this doctor on this day"
      });
    }

    const availability = await DoctorAvailability.create(data);

    return res.status(201).json({
      message: "Doctor availability created successfully",
      data: availability
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// 🔹 Get All (With Filters + Pagination)
export const getAllDoctorAvailability = async (req, res) => {
  try {
    const {
      hospitalId,
      branchId,
      doctorId,
      dayOfWeek,
      isActive,
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    if (hospitalId) filter.hospitalId = hospitalId;
    if (branchId) filter.branchId = branchId;
    if (doctorId) filter.doctorId = doctorId;
    if (dayOfWeek) filter.dayOfWeek = dayOfWeek;
    if (isActive !== undefined) filter.isActive = isActive;

    const skip = (page - 1) * limit;

    const availability = await DoctorAvailability.find(filter)
      .populate("doctorId", "name role")
      .populate("branchId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await DoctorAvailability.countDocuments(filter);

    return res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: availability
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// 🔹 Get By ID
export const getDoctorAvailabilityById = async (req, res) => {
  try {
    const availability = await DoctorAvailability.findById(req.params.id)
      .populate("doctorId")
      .populate("branchId");

    if (!availability) {
      return res.status(404).json({ message: "Availability not found" });
    }

    return res.status(200).json(availability);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// 🔹 Update Availability
export const updateDoctorAvailability = async (req, res) => {
  try {
    const updated = await DoctorAvailability.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Availability not found" });
    }

    return res.status(200).json({
      message: "Doctor availability updated successfully",
      data: updated
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// 🔹 Toggle Active Status
export const toggleAvailabilityStatus = async (req, res) => {
  try {
    const availability = await DoctorAvailability.findById(req.params.id);

    if (!availability) {
      return res.status(404).json({ message: "Availability not found" });
    }

    availability.isActive = !availability.isActive;
    await availability.save();

    return res.status(200).json({
      message: "Availability status updated",
      data: availability
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// 🔹 Soft Delete
export const deleteDoctorAvailability = async (req, res) => {
  try {
    await DoctorAvailability.findByIdAndUpdate(req.params.id, {
      isActive: false
    });

    return res.status(200).json({
      message: "Doctor availability deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};