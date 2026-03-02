import RadiologyReport from "../models/RadiologyReport.js";
import mongoose from "mongoose";

/* =====================================
   CREATE RADIOLOGY REPORT (Draft)
===================================== */
export const createRadiologyReport = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { radiologyStudyId, findings, impression } = req.body;

    const report = await RadiologyReport.create({
      hospitalId,
      branchId,
      radiologyStudyId,
      findings,
      impression,
      reportedBy: userId
    });

    res.status(201).json({
      success: true,
      message: "Radiology Report Created Successfully",
      data: report
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =====================================
   GET ALL REPORTS (FILTER + PAGINATION)
===================================== */
export const getAllRadiologyReports = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      reportStatus,
      radiologyStudyId,
      reportedBy,
      verifiedBy,
      fromDate,
      toDate,
      page = 1,
      limit = 10
    } = req.query;

    let filter = { hospitalId, branchId };

    if (reportStatus) filter.reportStatus = reportStatus;

    if (radiologyStudyId && mongoose.Types.ObjectId.isValid(radiologyStudyId)) {
      filter.radiologyStudyId = radiologyStudyId;
    }

    if (reportedBy && mongoose.Types.ObjectId.isValid(reportedBy)) {
      filter.reportedBy = reportedBy;
    }

    if (verifiedBy && mongoose.Types.ObjectId.isValid(verifiedBy)) {
      filter.verifiedBy = verifiedBy;
    }

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const skip = (page - 1) * limit;

    const reports = await RadiologyReport.find(filter)
      .populate("radiologyStudyId")
      .populate("reportedBy", "name role")
      .populate("verifiedBy", "name role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await RadiologyReport.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: reports
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =====================================
   GET SINGLE REPORT
===================================== */
export const getRadiologyReportById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const report = await RadiologyReport.findOne({
      _id: id,
      hospitalId,
      branchId
    })
      .populate("radiologyStudyId")
      .populate("reportedBy", "name role")
      .populate("verifiedBy", "name role");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Radiology Report Not Found"
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =====================================
   UPDATE REPORT (Only if Draft)
===================================== */
export const updateRadiologyReport = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const report = await RadiologyReport.findOne({
      _id: id,
      hospitalId,
      branchId
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Radiology Report Not Found"
      });
    }

    if (report.reportStatus === "Verified") {
      return res.status(400).json({
        success: false,
        message: "Verified report cannot be modified"
      });
    }

    const allowedFields = ["findings", "impression", "reportStatus"];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        report[field] = req.body[field];
      }
    });

    await report.save();

    res.status(200).json({
      success: true,
      message: "Radiology Report Updated Successfully",
      data: report
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =====================================
   VERIFY REPORT
===================================== */
export const verifyRadiologyReport = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { id } = req.params;

    const report = await RadiologyReport.findOne({
      _id: id,
      hospitalId,
      branchId
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Radiology Report Not Found"
      });
    }

    report.reportStatus = "Verified";
    report.verifiedBy = userId;
    report.verifiedAt = new Date();

    await report.save();

    res.status(200).json({
      success: true,
      message: "Radiology Report Verified Successfully",
      data: report
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =====================================
   DELETE REPORT
===================================== */
export const deleteRadiologyReport = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const report = await RadiologyReport.findOneAndDelete({
      _id: id,
      hospitalId,
      branchId
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Radiology Report Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Radiology Report Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};