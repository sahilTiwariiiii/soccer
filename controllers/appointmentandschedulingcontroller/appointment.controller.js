import Appointment from "../models/Appointment.js";

// 🔹 Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const data = req.body;

    const appointment = await Appointment.create(data);

    return res.status(201).json({
      message: "Appointment created successfully",
      data: appointment
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 🔹 Get All Appointments (With Filters + Pagination)
export const getAllAppointments = async (req, res) => {
  try {
    const {
      hospitalId,
      branchId,
      doctorId,
      patientId,
      status,
      consultationType,
      startDate,
      endDate,
      page = 1,
      limit = 10
    } = req.query;

    const filter = { isActive: true };

    if (hospitalId) filter.hospitalId = hospitalId;
    if (branchId) filter.branchId = branchId;
    if (doctorId) filter.doctorId = doctorId;
    if (patientId) filter.patientId = patientId;
    if (status) filter.status = status;
    if (consultationType) filter.consultationType = consultationType;

    if (startDate && endDate) {
      filter.appointmentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const skip = (page - 1) * limit;

    const appointments = await Appointment.find(filter)
      .populate("patientId", "name phone")
      .populate("doctorId", "name role")
      .populate("branchId", "name")
      .sort({ appointmentDate: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Appointment.countDocuments(filter);

    return res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: appointments
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Appointment By ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patientId")
      .populate("doctorId")
      .populate("branchId");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json(appointment);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 🔹 Update Appointment
export const updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({
      message: "Appointment updated successfully",
      data: updated
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 🔹 Update Status Only (Important for HMS Flow)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({
      message: "Status updated successfully",
      data: updated
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 🔹 Cancel Appointment (Proper HMS Logic)
export const cancelAppointment = async (req, res) => {
  try {
    const { cancellationReason, cancelledBy } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: "Cancelled",
        cancellationReason,
        cancelledBy
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Appointment cancelled",
      data: updated
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 🔹 Soft Delete
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, {
      isActive: false
    });

    return res.status(200).json({
      message: "Appointment deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};