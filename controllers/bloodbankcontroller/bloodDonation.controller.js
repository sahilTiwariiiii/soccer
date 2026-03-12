// controllers/bloodDonation.controller.js
import BloodDonation from "../../models/bloodbank/BloodDonation.js";
import BloodDonor from "../../models/bloodbank/BloodDonor.js";


// CREATE Donation
export const createBloodDonation = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const {
      donationNumber,
      donorId,
      campId,
      donationDate,
      bloodGroup,
      quantityML,
      bagNumber,
    } = req.body;

    if (!donationNumber || !donorId || !donationDate || !bagNumber) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    // Unique donation number per hospital
    const existing = await BloodDonation.findOne({
      donationNumber,
      hospitalId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Donation number already exists",
      });
    }

    const donation = await BloodDonation.create({
      hospitalId,
      branchId,
      donationNumber,
      donorId,
      campId,
      donationDate,
      collectedBy: userId,
      bloodGroup,
      quantityML,
      bagNumber,
    });

    // Update donor donation count
    await BloodDonor.findByIdAndUpdate(donorId, {
      $inc: { totalDonations: 1 },
      lastDonationDate: donationDate,
    });

    return res.status(201).json({
      message: "Blood donation recorded successfully",
      data: donation,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// GET All Donations (Filters Supported)
export const getAllBloodDonations = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { status, bloodGroup, donorId, startDate, endDate, search } = req.query;

    const filter = { hospitalId, branchId };

    if (status) filter.status = status;
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (donorId) filter.donorId = donorId;

    if (startDate && endDate) {
      filter.donationDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (search) {
      filter.$or = [
        { donationNumber: { $regex: search, $options: "i" } },
        { bagNumber: { $regex: search, $options: "i" } },
      ];
    }

    const donations = await BloodDonation.find(filter)
      .populate("donorId", "firstName lastName donorId")
      .populate("campId", "campName")
      .populate("bloodGroup", "name")
      .populate("collectedBy", "firstName lastName")
      .sort({ donationDate: -1 });

    return res.status(200).json({
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// GET Single Donation
export const getBloodDonationById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const donation = await BloodDonation.findOne({
      _id: id,
      hospitalId,
      branchId,
    })
      .populate("donorId", "firstName lastName donorId")
      .populate("campId", "campName")
      .populate("bloodGroup", "name")
      .populate("collectedBy", "firstName lastName");

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    return res.status(200).json({ data: donation });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// UPDATE Donation
export const updateBloodDonation = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const updated = await BloodDonation.findOneAndUpdate(
      { _id: id, hospitalId, branchId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Donation not found" });
    }

    return res.status(200).json({
      message: "Donation updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// DELETE Donation (Hard delete – enterprise usually restricts this)
export const deleteBloodDonation = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { id } = req.params;

    const deleted = await BloodDonation.findOneAndDelete({
      _id: id,
      hospitalId,
      branchId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Donation not found" });
    }

    return res.status(200).json({
      message: "Donation deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};