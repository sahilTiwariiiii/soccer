// controllers/bloodRequest.controller.js
import BloodRequest from "../models/BloodRequest.js";
import Patient from "../models/Patient.js";

/**
 * Create Blood Request
 */
export const createBloodRequest = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const {
      patientId,
      bloodGroup,
      componentType,
      quantityUnits,
    } = req.body;

    // Validate patient belongs to same hospital & branch
    const patient = await Patient.findOne({
      _id: patientId,
      hospitalId,
      branchId,
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found in this branch" });
    }

    const request = await BloodRequest.create({
      hospitalId,
      branchId,
      patientId,
      requestedBy: userId,
      bloodGroup,
      componentType,
      quantityUnits,
    });

    res.status(201).json({
      message: "Blood request created successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get All Blood Requests (With Filters)
 */
export const getAllBloodRequests = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      status,
      bloodGroup,
      componentType,
      patientId,
      fromDate,
      toDate,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { hospitalId, branchId };

    if (status) filter.status = status;
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (componentType) filter.componentType = componentType;
    if (patientId) filter.patientId = patientId;

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const requests = await BloodRequest.find(filter)
      .populate("patientId")
      .populate("requestedBy")
      .populate("bloodGroup")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await BloodRequest.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get Single Blood Request
 */
export const getBloodRequestById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const request = await BloodRequest.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    })
      .populate("patientId")
      .populate("requestedBy")
      .populate("bloodGroup");

    if (!request) {
      return res.status(404).json({ message: "Blood request not found" });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Blood Request (General Update)
 */
export const updateBloodRequest = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const request = await BloodRequest.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
      },
      req.body,
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Blood request not found" });
    }

    res.status(200).json({
      message: "Blood request updated successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Request Status (Approve / Reject / Issue)
 */
export const updateBloodRequestStatus = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { status } = req.body;

    const request = await BloodRequest.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!request) {
      return res.status(404).json({ message: "Blood request not found" });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      message: "Blood request status updated successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete Blood Request
 */
export const deleteBloodRequest = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const request = await BloodRequest.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
    });

    if (!request) {
      return res.status(404).json({ message: "Blood request not found" });
    }

    res.status(200).json({
      message: "Blood request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};