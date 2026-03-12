// controllers/crossMatch.controller.js
import CrossMatch from "../../models/bloodbank/CrossMatch.js";
import BloodRequest from "../../models/bloodbank/BloodRequest.js";
import BloodComponent from "../../models/bloodbank/BloodComponent.js";

/**
 * Create Cross Match Entry
 */
export const createCrossMatch = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { requestId, componentId, result } = req.body;

    // Validate Blood Request
    const request = await BloodRequest.findOne({
      _id: requestId,
      hospitalId,
      branchId,
    });

    if (!request) {
      return res.status(404).json({ message: "Blood request not found in this branch" });
    }

    // Validate Blood Component
    const component = await BloodComponent.findOne({
      _id: componentId,
      hospitalId,
      branchId,
    });

    if (!component) {
      return res.status(404).json({ message: "Blood component not found in this branch" });
    }

    const crossMatch = await CrossMatch.create({
      hospitalId,
      branchId,
      requestId,
      componentId,
      result,
      performedBy: userId,
      performedAt: new Date(),
    });

    res.status(201).json({
      message: "Cross match created successfully",
      data: crossMatch,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get All Cross Matches (With Filters)
 */
export const getAllCrossMatches = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      result,
      requestId,
      componentId,
      fromDate,
      toDate,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { hospitalId, branchId };

    if (result) filter.result = result;
    if (requestId) filter.requestId = requestId;
    if (componentId) filter.componentId = componentId;

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const data = await CrossMatch.find(filter)
      .populate("requestId")
      .populate("componentId")
      .populate("performedBy")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await CrossMatch.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get Single Cross Match
 */
export const getCrossMatchById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const crossMatch = await CrossMatch.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    })
      .populate("requestId")
      .populate("componentId")
      .populate("performedBy");

    if (!crossMatch) {
      return res.status(404).json({ message: "Cross match not found" });
    }

    res.status(200).json(crossMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Cross Match
 */
export const updateCrossMatch = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const crossMatch = await CrossMatch.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
      },
      req.body,
      { new: true }
    );

    if (!crossMatch) {
      return res.status(404).json({ message: "Cross match not found" });
    }

    res.status(200).json({
      message: "Cross match updated successfully",
      data: crossMatch,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete Cross Match
 */
export const deleteCrossMatch = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const crossMatch = await CrossMatch.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!crossMatch) {
      return res.status(404).json({ message: "Cross match not found" });
    }

    res.status(200).json({
      message: "Cross match deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};