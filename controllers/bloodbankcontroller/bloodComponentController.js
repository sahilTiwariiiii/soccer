// controllers/bloodComponent.controller.js
import BloodComponent from "../models/BloodComponent.js";
import BloodDonation from "../models/BloodDonation.js";

/**
 * Create Blood Component (after separation)
 */
export const createBloodComponent = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const {
      donationId,
      componentType,
      quantityML,
      expiryDate,
    } = req.body;

    // Check donation belongs to same hospital & branch
    const donation = await BloodDonation.findOne({
      _id: donationId,
      hospitalId,
      branchId,
    });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found in this branch" });
    }

    const component = await BloodComponent.create({
      hospitalId,
      branchId,
      donationId,
      componentType,
      quantityML,
      expiryDate,
    });

    res.status(201).json({
      message: "Blood Component created successfully",
      data: component,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get All Components (with filters)
 */
export const getAllBloodComponents = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      componentType,
      status,
      donationId,
      fromDate,
      toDate,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {
      hospitalId,
      branchId,
    };

    if (componentType) filter.componentType = componentType;
    if (status) filter.status = status;
    if (donationId) filter.donationId = donationId;

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    // Optional search by component type
    if (search) {
      filter.componentType = { $regex: search, $options: "i" };
    }

    const components = await BloodComponent.find(filter)
      .populate("donationId")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await BloodComponent.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: components,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get Single Component
 */
export const getBloodComponentById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const component = await BloodComponent.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    }).populate("donationId");

    if (!component) {
      return res.status(404).json({ message: "Blood Component not found" });
    }

    res.status(200).json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Blood Component
 */
export const updateBloodComponent = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const component = await BloodComponent.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
      },
      req.body,
      { new: true }
    );

    if (!component) {
      return res.status(404).json({ message: "Blood Component not found" });
    }

    res.status(200).json({
      message: "Blood Component updated successfully",
      data: component,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Change Status (Reserve / Issue / Discard / Expire)
 */
export const updateBloodComponentStatus = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { status } = req.body;

    const component = await BloodComponent.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!component) {
      return res.status(404).json({ message: "Blood Component not found" });
    }

    component.status = status;
    await component.save();

    res.status(200).json({
      message: "Status updated successfully",
      data: component,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete Component
 */
export const deleteBloodComponent = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const component = await BloodComponent.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!component) {
      return res.status(404).json({ message: "Blood Component not found" });
    }

    res.status(200).json({ message: "Blood Component deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};