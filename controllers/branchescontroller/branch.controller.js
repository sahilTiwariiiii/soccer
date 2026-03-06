import Branch from "../../models/branches/BranchSchema.js";

export const createBranch = async (req, res) => {
  try {
    const { hospitalId, _id: userId } = req.user || {};

    if (!hospitalId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId missing in token" });
    }

    const branch = await Branch.create({
      ...req.body,
      hospitalId,
      createdBy: userId,
    });

    return res.status(201).json({
      message: "Branch created successfully",
      data: branch,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBranches = async (req, res) => {
  try {
    const { hospitalId } = req.user || {};
    if (!hospitalId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId missing in token" });
    }

    const { search, isActive, isVerified, page = 1, limit = 10 } = req.query;

    const filter = { hospitalId };
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (isVerified !== undefined) filter.isVerified = isVerified === "true";
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { branchCode: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { contactNumber: { $regex: search, $options: "i" } },
      ];
    }

    const docs = await Branch.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Branch.countDocuments(filter);

    return res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: docs,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBranchById = async (req, res) => {
  try {
    const { hospitalId } = req.user || {};
    if (!hospitalId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId missing in token" });
    }

    const doc = await Branch.findOne({ _id: req.params.id, hospitalId });
    if (!doc) return res.status(404).json({ message: "Branch not found" });

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBranch = async (req, res) => {
  try {
    const { hospitalId } = req.user || {};
    if (!hospitalId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId missing in token" });
    }

    const updated = await Branch.findOneAndUpdate(
      { _id: req.params.id, hospitalId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Branch not found" });

    return res.status(200).json({
      message: "Branch updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBranch = async (req, res) => {
  try {
    const { hospitalId } = req.user || {};
    if (!hospitalId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId missing in token" });
    }

    const deleted = await Branch.findOneAndDelete({ _id: req.params.id, hospitalId });
    if (!deleted) return res.status(404).json({ message: "Branch not found" });

    return res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

