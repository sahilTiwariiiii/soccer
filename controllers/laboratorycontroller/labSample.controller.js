import LabSample from "../../models/laboratorymanagement/LabSample.js";
import mongoose from "mongoose";

/**
 * @desc Create Lab Sample (when sample collected)
 */
export const createLabSample = async (req, res) => {
  try {
    const { investigationOrderId, sampleType, barcode } = req.body;

    const { hospitalId, branchId, _id: userId } = req.user;

    const sample = await LabSample.create({
      hospitalId,
      branchId,
      investigationOrderId,
      sampleType,
      barcode,
      collectedBy: userId,
      collectedAt: new Date(),
      status: "Collected"
    });

    res.status(201).json({
      success: true,
      message: "Lab Sample Created Successfully",
      data: sample
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * @desc Get All Lab Samples (with filters + pagination)
 */
export const getAllLabSamples = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      status,
      sampleType,
      investigationOrderId,
      barcode,
      fromDate,
      toDate,
      page = 1,
      limit = 10
    } = req.query;

    let filter = { hospitalId, branchId };

    if (status) filter.status = status;
    if (sampleType) filter.sampleType = sampleType;
    if (barcode) filter.barcode = barcode;
    if (investigationOrderId && mongoose.Types.ObjectId.isValid(investigationOrderId)) {
      filter.investigationOrderId = investigationOrderId;
    }

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const skip = (page - 1) * limit;

    const samples = await LabSample.find(filter)
      .populate("investigationOrderId")
      .populate("collectedBy", "name role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await LabSample.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: samples
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * @desc Get Single Lab Sample
 */
export const getLabSampleById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const sample = await LabSample.findOne({
      _id: id,
      hospitalId,
      branchId
    })
      .populate("investigationOrderId")
      .populate("collectedBy", "name role");

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Lab Sample Not Found"
      });
    }

    res.status(200).json({ success: true, data: sample });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * @desc Update Lab Sample Status (Received / Processing / Completed)
 */
export const updateLabSampleStatus = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;
    const { status } = req.body;

    const sample = await LabSample.findOne({
      _id: id,
      hospitalId,
      branchId
    });

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Lab Sample Not Found"
      });
    }

    sample.status = status;

    if (status === "Received") sample.receivedAt = new Date();
    if (status === "Processing") sample.processedAt = new Date();
    if (status === "Completed") sample.processedAt = new Date();

    await sample.save();

    res.status(200).json({
      success: true,
      message: "Status Updated Successfully",
      data: sample
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * @desc Delete Lab Sample (Soft delete recommended in production)
 */
export const deleteLabSample = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const sample = await LabSample.findOneAndDelete({
      _id: id,
      hospitalId,
      branchId
    });

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Lab Sample Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Lab Sample Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};