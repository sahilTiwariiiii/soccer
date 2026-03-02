// controllers/bloodDiscard.controller.js
import BloodDiscard from "../models/BloodDiscard.js";
import BloodComponent from "../models/BloodComponent.js";
import BloodInventory from "../models/BloodInventory.js";

/**
 * Discard Blood Component
 */
export const createBloodDiscard = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { componentId, reason } = req.body;

    // Validate Component
    const component = await BloodComponent.findOne({
      _id: componentId,
      hospitalId,
      branchId,
    });

    if (!component) {
      return res.status(404).json({
        message: "Blood component not found in this branch",
      });
    }

    // Prevent double discard
    if (component.status === "Discarded") {
      return res.status(400).json({
        message: "Component already discarded",
      });
    }

    // Create discard record
    const discard = await BloodDiscard.create({
      hospitalId,
      branchId,
      componentId,
      reason,
      discardedBy: userId,
      discardDate: new Date(),
    });

    // Update component status
    component.status = "Discarded";
    await component.save();

    // Update inventory status
    await BloodInventory.findOneAndUpdate(
      { componentId, hospitalId, branchId },
      { currentStatus: "Discarded" }
    );

    res.status(201).json({
      message: "Blood component discarded successfully",
      data: discard,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get All Discard Records (With Filters)
 */
export const getAllBloodDiscards = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      componentId,
      fromDate,
      toDate,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { hospitalId, branchId };

    if (componentId) filter.componentId = componentId;

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const discards = await BloodDiscard.find(filter)
      .populate("componentId")
      .populate("discardedBy")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await BloodDiscard.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: discards,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get Single Discard Record
 */
export const getBloodDiscardById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const discard = await BloodDiscard.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    })
      .populate("componentId")
      .populate("discardedBy");

    if (!discard) {
      return res.status(404).json({ message: "Discard record not found" });
    }

    res.status(200).json(discard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete Discard Record (Admin Only Ideally)
 */
export const deleteBloodDiscard = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const discard = await BloodDiscard.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!discard) {
      return res.status(404).json({ message: "Discard record not found" });
    }

    res.status(200).json({
      message: "Discard record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};