import Room from "../../models/branches/RoomSchema.js";

export const createRoom = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const doc = await Room.create({
      ...req.body,
      hospitalId,
      branchId,
    });

    return res.status(201).json({ message: "Room created successfully", data: doc });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const {
      floorId,
      roomType,
      status,
      departmentId,
      assignedDoctor,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { hospitalId, branchId };
    if (floorId) filter.floorId = floorId;
    if (roomType) filter.roomType = roomType;
    if (status) filter.status = status;
    if (departmentId) filter.departmentId = departmentId;
    if (assignedDoctor) filter.assignedDoctor = assignedDoctor;
    if (search) {
      filter.$or = [
        { roomNumber: { $regex: search, $options: "i" } },
        { roomName: { $regex: search, $options: "i" } },
      ];
    }

    const docs = await Room.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Room.countDocuments(filter);

    return res.status(200).json({ total, page: Number(page), limit: Number(limit), data: docs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const doc = await Room.findOne({ _id: req.params.id, hospitalId, branchId });
    if (!doc) return res.status(404).json({ message: "Room not found" });

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const updated = await Room.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Room not found" });

    return res.status(200).json({ message: "Room updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const deleted = await Room.findOneAndDelete({ _id: req.params.id, hospitalId, branchId });
    if (!deleted) return res.status(404).json({ message: "Room not found" });

    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRoomsByDoctor = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const { doctorId } = req.params;
    const rooms = await Room.find({ hospitalId, branchId, assignedDoctor: doctorId }).sort({ roomNumber: 1 });
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

