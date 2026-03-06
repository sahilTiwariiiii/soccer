import Bed from "../../models/branches/BedSchema.js";

export const createBed = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const doc = await Bed.create({
      ...req.body,
      hospitalId,
      branchId,
    });

    return res.status(201).json({ message: "Bed created successfully", data: doc });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBeds = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const { roomId, bedType, status, search, page = 1, limit = 10 } = req.query;
    const filter = { hospitalId, branchId };
    if (roomId) filter.roomId = roomId;
    if (bedType) filter.bedType = bedType;
    if (status) filter.status = status;
    if (search) filter.bedNumber = { $regex: search, $options: "i" };

    const docs = await Bed.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Bed.countDocuments(filter);

    return res.status(200).json({ total, page: Number(page), limit: Number(limit), data: docs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBedById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const doc = await Bed.findOne({ _id: req.params.id, hospitalId, branchId });
    if (!doc) return res.status(404).json({ message: "Bed not found" });

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBed = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const updated = await Bed.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Bed not found" });

    return res.status(200).json({ message: "Bed updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBed = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const deleted = await Bed.findOneAndDelete({ _id: req.params.id, hospitalId, branchId });
    if (!deleted) return res.status(404).json({ message: "Bed not found" });

    return res.status(200).json({ message: "Bed deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

