// controllers/bloodInventory.controller.js
import BloodInventory from "../models/BloodInventory.js";
import BloodComponent from "../models/BloodComponent.js";

/**
 * Add Component To Inventory
 */
export const createBloodInventory = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { componentId, bloodGroup } = req.body;

    // Check component belongs to same hospital & branch
    const component = await BloodComponent.findOne({
      _id: componentId,
      hospitalId,
      branchId,
    });

    if (!component) {
      return res.status(404).json({ message: "Blood Component not found in this branch" });
    }

    const inventory = await BloodInventory.create({
      hospitalId,
      branchId,
      componentId,
      bloodGroup,
      currentStatus: component.status || "Available",
    });

    res.status(201).json({
      message: "Blood added to inventory successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get All Inventory (With Filters)
 */
export const getAllBloodInventory = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      bloodGroup,
      currentStatus,
      componentId,
      fromDate,
      toDate,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { hospitalId, branchId };

    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (currentStatus) filter.currentStatus = currentStatus;
    if (componentId) filter.componentId = componentId;

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const inventory = await BloodInventory.find(filter)
      .populate("componentId")
      .populate("bloodGroup")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await BloodInventory.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get Single Inventory Item
 */
export const getBloodInventoryById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const inventory = await BloodInventory.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    })
      .populate("componentId")
      .populate("bloodGroup");

    if (!inventory) {
      return res.status(404).json({ message: "Inventory record not found" });
    }

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Inventory (General Update)
 */
export const updateBloodInventory = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const inventory = await BloodInventory.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
      },
      req.body,
      { new: true }
    );

    if (!inventory) {
      return res.status(404).json({ message: "Inventory record not found" });
    }

    res.status(200).json({
      message: "Inventory updated successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Status Only (Reserve / Issue / Expire / Discard)
 */
export const updateBloodInventoryStatus = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { currentStatus } = req.body;

    const inventory = await BloodInventory.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!inventory) {
      return res.status(404).json({ message: "Inventory record not found" });
    }

    inventory.currentStatus = currentStatus;
    await inventory.save();

    res.status(200).json({
      message: "Inventory status updated successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete Inventory Record
 */
export const deleteBloodInventory = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const inventory = await BloodInventory.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!inventory) {
      return res.status(404).json({ message: "Inventory record not found" });
    }

    res.status(200).json({
      message: "Inventory record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};