// controllers/bloodIssue.controller.js
import BloodIssue from "../models/BloodIssue.js";
import BloodRequest from "../models/BloodRequest.js";
import BloodComponent from "../models/BloodComponent.js";
import BloodInventory from "../models/BloodInventory.js";

/**
 * Issue Blood
 */
export const createBloodIssue = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { requestId, componentId } = req.body;

    // 1️⃣ Validate Request
    const request = await BloodRequest.findOne({
      _id: requestId,
      hospitalId,
      branchId,
      status: "Approved",
    });

    if (!request) {
      return res.status(400).json({
        message: "Blood request not found or not approved",
      });
    }

    // 2️⃣ Validate Component
    const component = await BloodComponent.findOne({
      _id: componentId,
      hospitalId,
      branchId,
      status: "Available",
    });

    if (!component) {
      return res.status(400).json({
        message: "Blood component not available",
      });
    }

    // 3️⃣ Create Issue Entry
    const issue = await BloodIssue.create({
      hospitalId,
      branchId,
      requestId,
      componentId,
      issuedBy: userId,
      issueDate: new Date(),
    });

    // 4️⃣ Update Component Status
    component.status = "Issued";
    await component.save();

    // 5️⃣ Update Inventory Status
    await BloodInventory.findOneAndUpdate(
      { componentId, hospitalId, branchId },
      { currentStatus: "Issued" }
    );

    // 6️⃣ Update Request Status
    request.status = "Issued";
    await request.save();

    res.status(201).json({
      message: "Blood issued successfully",
      data: issue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get All Blood Issues (With Filters)
 */
export const getAllBloodIssues = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      status,
      requestId,
      componentId,
      fromDate,
      toDate,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { hospitalId, branchId };

    if (status) filter.status = status;
    if (requestId) filter.requestId = requestId;
    if (componentId) filter.componentId = componentId;

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const issues = await BloodIssue.find(filter)
      .populate("requestId")
      .populate("componentId")
      .populate("issuedBy")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await BloodIssue.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: issues,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get Single Blood Issue
 */
export const getBloodIssueById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const issue = await BloodIssue.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    })
      .populate("requestId")
      .populate("componentId")
      .populate("issuedBy");

    if (!issue) {
      return res.status(404).json({ message: "Blood issue record not found" });
    }

    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Return Blood
 */
export const returnBloodIssue = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const issue = await BloodIssue.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!issue) {
      return res.status(404).json({ message: "Blood issue record not found" });
    }

    if (issue.status === "Returned") {
      return res.status(400).json({ message: "Blood already returned" });
    }

    issue.status = "Returned";
    await issue.save();

    // Update Component back to Available
    await BloodComponent.findOneAndUpdate(
      { _id: issue.componentId, hospitalId, branchId },
      { status: "Available" }
    );

    // Update Inventory
    await BloodInventory.findOneAndUpdate(
      { componentId: issue.componentId, hospitalId, branchId },
      { currentStatus: "Available" }
    );

    res.status(200).json({
      message: "Blood returned successfully",
      data: issue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete Issue Record
 */
export const deleteBloodIssue = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const issue = await BloodIssue.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!issue) {
      return res.status(404).json({ message: "Blood issue record not found" });
    }

    res.status(200).json({
      message: "Blood issue deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};