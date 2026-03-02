import LabResult from "../models/LabResult.js";
import mongoose from "mongoose";

/**
 * @desc Create Lab Result (Enter Parameter Values)
 */
export const createLabResult = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { investigationOrderId, labSampleId, parameters } = req.body;

    const labResult = await LabResult.create({
      hospitalId,
      branchId,
      investigationOrderId,
      labSampleId,
      parameters,
      resultStatus: "Pending"
    });

    res.status(201).json({
      success: true,
      message: "Lab Result Created Successfully",
      data: labResult
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * @desc Get All Lab Results (Filters + Pagination)
 */
export const getAllLabResults = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      resultStatus,
      investigationOrderId,
      labSampleId,
      fromDate,
      toDate,
      page = 1,
      limit = 10
    } = req.query;

    let filter = { hospitalId, branchId };

    if (resultStatus) filter.resultStatus = resultStatus;

    if (investigationOrderId && mongoose.Types.ObjectId.isValid(investigationOrderId)) {
      filter.investigationOrderId = investigationOrderId;
    }

    if (labSampleId && mongoose.Types.ObjectId.isValid(labSampleId)) {
      filter.labSampleId = labSampleId;
    }

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const skip = (page - 1) * limit;

    const results = await LabResult.find(filter)
      .populate("investigationOrderId")
      .populate("labSampleId")
      .populate("verifiedBy", "name role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await LabResult.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: results
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * @desc Get Single Lab Result
 */
export const getLabResultById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const result = await LabResult.findOne({
      _id: id,
      hospitalId,
      branchId
    })
      .populate("investigationOrderId")
      .populate("labSampleId")
      .populate("verifiedBy", "name role");

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Lab Result Not Found"
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * @desc Update Lab Result Parameters
 */
export const updateLabResult = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;
    const { parameters } = req.body;

    const result = await LabResult.findOne({
      _id: id,
      hospitalId,
      branchId
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Lab Result Not Found"
      });
    }

    result.parameters = parameters;
    await result.save();

    res.status(200).json({
      success: true,
      message: "Lab Result Updated Successfully",
      data: result
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * @desc Update Result Status (Completed / Verified)
 */
export const updateLabResultStatus = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { id } = req.params;
    const { resultStatus } = req.body;

    const result = await LabResult.findOne({
      _id: id,
      hospitalId,
      branchId
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Lab Result Not Found"
      });
    }

    result.resultStatus = resultStatus;

    if (resultStatus === "Verified") {
      result.verifiedBy = userId;
      result.verifiedAt = new Date();
    }

    await result.save();

    res.status(200).json({
      success: true,
      message: "Result Status Updated Successfully",
      data: result
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * @desc Delete Lab Result
 */
export const deleteLabResult = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const result = await LabResult.findOneAndDelete({
      _id: id,
      hospitalId,
      branchId
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Lab Result Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Lab Result Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};