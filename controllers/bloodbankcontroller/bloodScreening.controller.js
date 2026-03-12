// controllers/bloodScreening.controller.js
import BloodScreening from "../../models/bloodbank/BloodScreening.js";
import BloodDonation from "../../models/bloodbank/BloodDonation.js";


// CREATE Screening
export const createBloodScreening = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const {
      donationId,
      hiv,
      hbsag,
      hcv,
      malaria,
      syphilis,
      testDate,
    } = req.body;

    if (!donationId) {
      return res.status(400).json({ message: "Donation ID is required" });
    }

    // Check donation belongs to same hospital & branch
    const donation = await BloodDonation.findOne({
      _id: donationId,
      hospitalId,
      branchId,
    });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Prevent duplicate screening
    const existing = await BloodScreening.findOne({
      donationId,
      hospitalId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Screening already done for this donation",
      });
    }

    // Auto status logic
    const isUnsafe =
      hiv || hbsag || hcv || malaria || syphilis;

    const screening = await BloodScreening.create({
      hospitalId,
      branchId,
      donationId,
      hiv,
      hbsag,
      hcv,
      malaria,
      syphilis,
      testedBy: userId,
      testDate,
      status: isUnsafe ? "Unsafe" : "Safe",
    });

    // Update donation status
    await BloodDonation.findByIdAndUpdate(donationId, {
      status: isUnsafe ? "Discarded" : "Tested",
    });

    return res.status(201).json({
      message: "Blood screening completed successfully",
      data: screening,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// GET All Screenings (With Filters)
export const getAllBloodScreenings = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { status, startDate, endDate } = req.query;

    const filter = { hospitalId, branchId };

    if (status) filter.status = status;

    if (startDate && endDate) {
      filter.testDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const screenings = await BloodScreening.find(filter)
      .populate({
        path: "donationId",
        populate: {
          path: "donorId",
          select: "firstName lastName donorId",
        },
      })
      .populate("testedBy", "firstName lastName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: screenings.length,
      data: screenings,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// GET Single Screening
export const getBloodScreeningById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const screening = await BloodScreening.findOne({
      _id: id,
      hospitalId,
      branchId,
    })
      .populate({
        path: "donationId",
        populate: {
          path: "donorId",
          select: "firstName lastName donorId",
        },
      })
      .populate("testedBy", "firstName lastName");

    if (!screening) {
      return res.status(404).json({ message: "Screening not found" });
    }

    return res.status(200).json({ data: screening });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// UPDATE Screening (Rarely allowed in enterprise)
export const updateBloodScreening = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const updated = await BloodScreening.findOneAndUpdate(
      { _id: id, hospitalId, branchId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Screening not found" });
    }

    return res.status(200).json({
      message: "Screening updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// DELETE Screening (Normally restricted)
export const deleteBloodScreening = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const deleted = await BloodScreening.findOneAndDelete({
      _id: id,
      hospitalId,
      branchId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Screening not found" });
    }

    return res.status(200).json({
      message: "Screening deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};