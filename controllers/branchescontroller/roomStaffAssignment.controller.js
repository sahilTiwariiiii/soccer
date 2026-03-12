import RoomStaffAssignment from '../../models/branches/RoomStaffAssignmentSchema.js';

export const createRoomStaffAssignment = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const doc = await RoomStaffAssignment.create({
      ...req.body,
      hospitalId,
      branchId,
    });

    return res.status(201).json({
      message: "Room staff assignment created successfully",
      data: doc,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRoomStaffAssignments = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const { floorId, roomId, staffId, role, shift, page = 1, limit = 10 } = req.query;

    const filter = { hospitalId, branchId };
    if (floorId) filter.floorId = floorId;
    if (roomId) filter.roomId = roomId;
    if (staffId) filter.staffId = staffId;
    if (role) filter.role = role;
    if (shift) filter.shift = shift;

    const docs = await RoomStaffAssignment.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await RoomStaffAssignment.countDocuments(filter);

    return res.status(200).json({ total, page: Number(page), limit: Number(limit), data: docs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRoomStaffAssignmentById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const doc = await RoomStaffAssignment.findOne({ _id: req.params.id, hospitalId, branchId });
    if (!doc) return res.status(404).json({ message: "Room staff assignment not found" });

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRoomStaffAssignment = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const updated = await RoomStaffAssignment.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Room staff assignment not found" });

    return res.status(200).json({
      message: "Room staff assignment updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRoomStaffAssignment = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const deleted = await RoomStaffAssignment.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!deleted) return res.status(404).json({ message: "Room staff assignment not found" });

    return res.status(200).json({ message: "Room staff assignment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

