import Appointment from "../../models/appointmentandscheduling/AppointmentSchema.js";

/* ======================================================
   🔹 Create Appointment
====================================================== */
export const createAppointment = async (req, res) => {
  try {
    const { hospitalId, branchId, _id } = req.user;

    const {
      patientId,
      doctorId,
      appointmentDate,
      startTime,
      endTime,
      consultationType,
      reason,
      notes
    } = req.body;

    // 🔹 Basic validation
    if (!patientId || !doctorId || !appointmentDate || !startTime || !endTime) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // 🔹 Generate appointment number
    const appointmentNumber = `APT-${Date.now()}`;

    const appointment = await Appointment.create({
      hospitalId,
      branchId,
      appointmentNumber,
      patientId,
      doctorId,
      appointmentDate,
      startTime,
      endTime,
      consultationType,
      reason,
      notes,
      bookedBy: _id
    });

    return res.status(201).json({
      message: "Appointment created successfully",
      data: appointment
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/* ======================================================
   🔹 Get All Appointments (Hospital Scoped)
====================================================== */
export const getAllAppointments = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      doctorId,
      patientId,
      status,
      consultationType,
      startDate,
      endDate,
      page = 1,
      limit = 10
    } = req.query;

    const filter = {
      hospitalId,
      branchId,
      isActive: true
    };

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

    const skip = (Number(page) - 1) * Number(limit);

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


/* ======================================================
   🔹 Get Appointment By ID (Scoped)
====================================================== */
export const getAppointmentById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const appointment = await Appointment.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
      isActive: true
    })
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


/* ======================================================
   🔹 Update Appointment (Restricted Fields)
====================================================== */
export const updateAppointment = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const allowedFields = [
      "appointmentDate",
      "startTime",
      "endTime",
      "consultationType",
      "reason",
      "notes"
    ];

    const updateData = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updated = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
        isActive: true
      },
      updateData,
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


/* ======================================================
   🔹 Update Status (HMS Flow Safe)
====================================================== */
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updated = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
        isActive: true
      },
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


/* ======================================================
   🔹 Cancel Appointment (Real HMS Logic)
====================================================== */
export const cancelAppointment = async (req, res) => {
  try {
    const { hospitalId, branchId, _id } = req.user;
    const { cancellationReason } = req.body;

    const updated = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
        isActive: true
      },
      {
        status: "Cancelled",
        cancellationReason,
        cancelledBy: _id
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({
      message: "Appointment cancelled successfully",
      data: updated
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/* ======================================================
   🔹 Soft Delete (Multi-Tenant Safe)
====================================================== */
export const deleteAppointment = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const deleted = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId
      },
      { isActive: false },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({
      message: "Appointment deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};