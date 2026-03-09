import OpdToken from "../../models/opd/OpdToken.js";
import Room from "../../models/branches/RoomSchema.js";
import PatientVisit from "../../models/PatientVisitSchema.js";

export const issueToken = async (req, res) => {
  try {
    const { hospitalId, branchId, roomId, doctorId, patientId, visitId, priority } = req.body;
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });
    const visit = await PatientVisit.findById(visitId);
    if (!visit) return res.status(404).json({ message: "Visit not found" });
    const date = new Date();
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    const count = await OpdToken.countDocuments({ roomId, tokenDate: { $gte: start, $lt: end } });
    const tokenNumber = count + 1;
    const doc = await OpdToken.create({
      hospitalId,
      branchId,
      roomId,
      doctorId: doctorId || room.assignedDoctor,
      patientId,
      visitId,
      tokenDate: date,
      tokenNumber,
      priority: priority || "Normal"
    });
    return res.status(201).json({ message: "Token issued", data: doc });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const listTokens = async (req, res) => {
  try {
    const { roomId, status, date, doctorId: queryDoctorId } = req.query;
    const filter = {};

    if (req.user.role && req.user.role.trim().toLowerCase() === "doctor") {
      // Doctors can only see their own tokens
      filter.doctorId = req.user.id; // Using req.user.id from the JWT payload
    } else {
      // For non-doctor roles (e.g., admin, receptionist), require a specific filter
      if (!queryDoctorId && !roomId) {
        return res.status(400).json({ message: "For non-doctor roles, either doctorId or roomId is required as a filter." });
      }
      if (queryDoctorId) {
        filter.doctorId = queryDoctorId;
      }
      if (roomId) {
        filter.roomId = roomId;
      }
    }

    if (status) filter.status = status;
    if (date) {
      const d = new Date(date);
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      filter.tokenDate = { $gte: start, $lt: end };
    }
    const docs = await OpdToken.find(filter).sort({ tokenNumber: 1 });
    return res.status(200).json(docs);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const callToken = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await OpdToken.findByIdAndUpdate(id, { status: "Called", calledAt: new Date() }, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ message: "Token called", data: updated });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const completeToken = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await OpdToken.findByIdAndUpdate(id, { status: "Completed", completedAt: new Date() }, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ message: "Token completed", data: updated });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
