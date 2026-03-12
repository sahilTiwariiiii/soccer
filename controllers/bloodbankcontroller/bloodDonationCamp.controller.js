// controllers/bloodDonationCamp.controller.js
import BloodDonationCamp from "../../models/bloodbank/BloodDonationCamp.js";


// CREATE Camp
export const createBloodDonationCamp = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const {
      campName,
      location,
      startDate,
      endDate,
      organizedBy,
      doctorInCharge,
    } = req.body;

    if (!campName || !startDate) {
      return res.status(400).json({
        message: "Camp name and start date are required",
      });
    }

    const camp = await BloodDonationCamp.create({
      hospitalId,
      branchId,
      campName,
      location,
      startDate,
      endDate,
      organizedBy,
      doctorInCharge,
    });

    return res.status(201).json({
      message: "Blood donation camp created successfully",
      data: camp,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// GET All Camps (With Filters)
export const getAllBloodDonationCamps = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { search, startDate, endDate } = req.query;

    const filter = {
      hospitalId,
      branchId,
    };

    if (search) {
      filter.$or = [
        { campName: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { organizedBy: { $regex: search, $options: "i" } },
      ];
    }

    if (startDate && endDate) {
      filter.startDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const camps = await BloodDonationCamp.find(filter)
      .populate("doctorInCharge", "firstName lastName")
      .sort({ startDate: -1 });

    return res.status(200).json({
      count: camps.length,
      data: camps,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// GET Single Camp
export const getBloodDonationCampById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const camp = await BloodDonationCamp.findOne({
      _id: id,
      hospitalId,
      branchId,
    }).populate("doctorInCharge", "firstName lastName");

    if (!camp) {
      return res.status(404).json({ message: "Camp not found" });
    }

    return res.status(200).json({ data: camp });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// UPDATE Camp
export const updateBloodDonationCamp = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const updatedCamp = await BloodDonationCamp.findOneAndUpdate(
      { _id: id, hospitalId, branchId },
      req.body,
      { new: true }
    );

    if (!updatedCamp) {
      return res.status(404).json({ message: "Camp not found" });
    }

    return res.status(200).json({
      message: "Camp updated successfully",
      data: updatedCamp,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// DELETE Camp
export const deleteBloodDonationCamp = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const deleted = await BloodDonationCamp.findOneAndDelete({
      _id: id,
      hospitalId,
      branchId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Camp not found" });
    }

    return res.status(200).json({
      message: "Camp deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};