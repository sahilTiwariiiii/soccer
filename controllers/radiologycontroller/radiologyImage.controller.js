import RadiologyImage from "../models/RadiologyImage.js";
import mongoose from "mongoose";

/* =====================================
   CREATE RADIOLOGY IMAGE (Upload Link)
===================================== */
export const createRadiologyImage = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { radiologyStudyId, imageUrl, dicomId } = req.body;

    const image = await RadiologyImage.create({
      hospitalId,
      branchId,
      radiologyStudyId,
      imageUrl,
      dicomId
    });

    res.status(201).json({
      success: true,
      message: "Radiology Image Added Successfully",
      data: image
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =====================================
   GET ALL IMAGES (FILTER + PAGINATION)
===================================== */
export const getAllRadiologyImages = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const {
      radiologyStudyId,
      dicomId,
      fromDate,
      toDate,
      page = 1,
      limit = 10
    } = req.query;

    let filter = { hospitalId, branchId };

    if (
      radiologyStudyId &&
      mongoose.Types.ObjectId.isValid(radiologyStudyId)
    ) {
      filter.radiologyStudyId = radiologyStudyId;
    }

    if (dicomId) {
      filter.dicomId = dicomId;
    }

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const skip = (page - 1) * limit;

    const images = await RadiologyImage.find(filter)
      .populate("radiologyStudyId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await RadiologyImage.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: images
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =====================================
   GET SINGLE IMAGE
===================================== */
export const getRadiologyImageById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const image = await RadiologyImage.findOne({
      _id: id,
      hospitalId,
      branchId
    }).populate("radiologyStudyId");

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Radiology Image Not Found"
      });
    }

    res.status(200).json({
      success: true,
      data: image
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =====================================
   UPDATE IMAGE DETAILS
===================================== */
export const updateRadiologyImage = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const image = await RadiologyImage.findOne({
      _id: id,
      hospitalId,
      branchId
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Radiology Image Not Found"
      });
    }

    const allowedFields = ["imageUrl", "dicomId"];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        image[field] = req.body[field];
      }
    });

    await image.save();

    res.status(200).json({
      success: true,
      message: "Radiology Image Updated Successfully",
      data: image
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* =====================================
   DELETE IMAGE
===================================== */
export const deleteRadiologyImage = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const image = await RadiologyImage.findOneAndDelete({
      _id: id,
      hospitalId,
      branchId
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Radiology Image Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Radiology Image Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};