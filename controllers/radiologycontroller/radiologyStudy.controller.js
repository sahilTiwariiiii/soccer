import RadiologyStudy from "../../models/radiology/RadiologyStudy.js";
import mongoose from "mongoose";

/* =====================================
   CREATE RADIOLOGY STUDY
===================================== */
export const createRadiologyStudy = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const {
      investigationOrderId,
      modality,
      scheduledAt,
      radiologistId,
      technicianId
    } = req.body;

    const study = await RadiologyStudy.create({
      hospitalId,
      branchId,
      investigationOrderId,
      modality,
      scheduledAt,
      radiologistId,
      technicianId
    });

    res.status(201).json({
      success: true,
      message: "Radiology Study Created Successfully",
      data: study
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================
   GET ALL STUDIES (FILTER + PAGINATION)
===================================== */
export const getAllRadiologyStudies = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      status,
      modality,
      radiologistId,
      technicianId,
      investigationOrderId,
      fromDate,
      toDate,
      page = 1,
      limit = 10
    } = req.query;

    let filter = { hospitalId, branchId };

    if (status) filter.status = status;
    if (modality) filter.modality = modality;

    if (radiologistId && mongoose.Types.ObjectId.isValid(radiologistId)) {
      filter.radiologistId = radiologistId;
    }

    if (technicianId && mongoose.Types.ObjectId.isValid(technicianId)) {
      filter.technicianId = technicianId;
    }

    if (
      investigationOrderId &&
      mongoose.Types.ObjectId.isValid(investigationOrderId)
    ) {
      filter.investigationOrderId = investigationOrderId;
    }

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const skip = (page - 1) * limit;

    const studies = await RadiologyStudy.find(filter)
      .populate("investigationOrderId")
      .populate("radiologistId", "name role")
      .populate("technicianId", "name role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await RadiologyStudy.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: studies
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================
   GET SINGLE STUDY
===================================== */
export const getRadiologyStudyById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const study = await RadiologyStudy.findOne({
      _id: id,
      hospitalId,
      branchId
    })
      .populate("investigationOrderId")
      .populate("radiologistId", "name role")
      .populate("technicianId", "name role");

    if (!study) {
      return res.status(404).json({
        success: false,
        message: "Radiology Study Not Found"
      });
    }

    res.status(200).json({
      success: true,
      data: study
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================
   UPDATE STUDY DETAILS
===================================== */
export const updateRadiologyStudy = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const study = await RadiologyStudy.findOne({
      _id: id,
      hospitalId,
      branchId
    });

    if (!study) {
      return res.status(404).json({
        success: false,
        message: "Radiology Study Not Found"
      });
    }

    const allowedFields = [
      "modality",
      "scheduledAt",
      "radiologistId",
      "technicianId"
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        study[field] = req.body[field];
      }
    });

    await study.save();

    res.status(200).json({
      success: true,
      message: "Radiology Study Updated Successfully",
      data: study
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================
   UPDATE STATUS (LIFECYCLE CONTROL)
===================================== */
export const updateRadiologyStudyStatus = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;
    const { status } = req.body;

    const study = await RadiologyStudy.findOne({
      _id: id,
      hospitalId,
      branchId
    });

    if (!study) {
      return res.status(404).json({
        success: false,
        message: "Radiology Study Not Found"
      });
    }

    study.status = status;

    if (status === "Checked-In") {
      study.startedAt = new Date();
    }

    if (status === "Completed") {
      study.completedAt = new Date();
    }

    await study.save();

    res.status(200).json({
      success: true,
      message: "Status Updated Successfully",
      data: study
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================
   DELETE STUDY
===================================== */
export const deleteRadiologyStudy = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const study = await RadiologyStudy.findOneAndDelete({
      _id: id,
      hospitalId,
      branchId
    });

    if (!study) {
      return res.status(404).json({
        success: false,
        message: "Radiology Study Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Radiology Study Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};