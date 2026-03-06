import Floor from "../../models/branches/FloorSchema.js";

export const createFloor = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const doc = await Floor.create({
      ...req.body,
      hospitalId,
      branchId,
    });

    return res.status(201).json({ message: "Floor created successfully", data: doc });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFloors = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const { floorType, isActive, search, page = 1, limit = 10 } = req.query;
    const filter = { hospitalId, branchId };

    if (floorType) filter.floorType = floorType;
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (search) {
      filter.$or = [
        { floorName: { $regex: search, $options: "i" } },
        { floorNumber: Number.isNaN(Number(search)) ? undefined : Number(search) },
      ].filter(Boolean);
    }

    const docs = await Floor.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Floor.countDocuments(filter);

    return res.status(200).json({ total, page: Number(page), limit: Number(limit), data: docs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFloorById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const doc = await Floor.findOne({ _id: req.params.id, hospitalId, branchId });
    if (!doc) return res.status(404).json({ message: "Floor not found" });

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateFloor = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const updated = await Floor.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Floor not found" });

    return res.status(200).json({ message: "Floor updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteFloor = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const deleted = await Floor.findOneAndDelete({ _id: req.params.id, hospitalId, branchId });
    if (!deleted) return res.status(404).json({ message: "Floor not found" });

    return res.status(200).json({ message: "Floor deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

