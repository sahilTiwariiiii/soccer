import InsuranceClaim from "../models/InsuranceClaimSchema.js";

// CREATE INSURANCE CLAIM
export const createInsuranceClaim = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const userId = req.user._id;

    const { invoiceId, insuranceCompany, claimAmount, insuranceNotes } = req.body;

    if (!invoiceId || !claimAmount) {
      return res.status(400).json({ success: false, message: "Invoice and claim amount are required" });
    }

    const claim = await InsuranceClaim.create({
      hospitalId,
      branchId,
      invoiceId,
      insuranceCompany,
      claimAmount,
      insuranceNotes,
      createdBy: userId
    });

    res.status(201).json({ success: true, message: "Insurance claim created successfully", data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL INSURANCE CLAIMS (FILTER + PAGINATION)
export const getInsuranceClaims = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const { claimStatus, invoiceId, insuranceCompany, page = 1, limit = 10 } = req.query;

    const filter = { hospitalId, branchId };

    if (claimStatus) filter.claimStatus = claimStatus;
    if (invoiceId) filter.invoiceId = invoiceId;
    if (insuranceCompany) filter.insuranceCompany = { $regex: insuranceCompany, $options: "i" };

    const claims = await InsuranceClaim.find(filter)
      .populate("invoiceId", "invoiceNumber totalAmount netAmount paymentStatus")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await InsuranceClaim.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: claims
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET CLAIM BY ID
export const getInsuranceClaimById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const claim = await InsuranceClaim.findOne({ _id: req.params.id, hospitalId, branchId })
      .populate("invoiceId", "invoiceNumber totalAmount netAmount paymentStatus")
      .populate("createdBy", "name email");

    if (!claim) return res.status(404).json({ success: false, message: "Insurance claim not found" });

    res.status(200).json({ success: true, data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE INSURANCE CLAIM (editable only if not settled)
export const updateInsuranceClaim = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const claim = await InsuranceClaim.findOne({ _id: req.params.id, hospitalId });

    if (!claim) return res.status(404).json({ success: false, message: "Insurance claim not found" });

    if (claim.claimStatus === "Settled") {
      return res.status(400).json({ success: false, message: "Cannot update settled claim" });
    }

    const fields = ["invoiceId","insuranceCompany","claimAmount","insuranceNotes"];
    fields.forEach(f => {
      if (req.body[f] !== undefined) claim[f] = req.body[f];
    });

    claim.updatedBy = req.user._id;
    await claim.save();

    res.status(200).json({ success: true, message: "Insurance claim updated successfully", data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// APPROVE CLAIM
export const approveInsuranceClaim = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const claim = await InsuranceClaim.findOne({ _id: req.params.id, hospitalId });

    if (!claim) return res.status(404).json({ success: false, message: "Insurance claim not found" });
    if (claim.claimStatus !== "Submitted") return res.status(400).json({ success: false, message: "Only submitted claims can be approved" });

    claim.claimStatus = "Approved";
    claim.approvedBy = req.user._id;
    await claim.save();

    res.status(200).json({ success: true, message: "Insurance claim approved", data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// REJECT CLAIM
export const rejectInsuranceClaim = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const claim = await InsuranceClaim.findOne({ _id: req.params.id, hospitalId });

    if (!claim) return res.status(404).json({ success: false, message: "Insurance claim not found" });
    if (claim.claimStatus !== "Submitted") return res.status(400).json({ success: false, message: "Only submitted claims can be rejected" });

    claim.claimStatus = "Rejected";
    claim.rejectedBy = req.user._id;
    claim.rejectionReason = req.body.rejectionReason;
    await claim.save();

    res.status(200).json({ success: true, message: "Insurance claim rejected", data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// MARK AS SETTLED
export const markClaimSettled = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const claim = await InsuranceClaim.findOne({ _id: req.params.id, hospitalId });

    if (!claim) return res.status(404).json({ success: false, message: "Insurance claim not found" });
    if (claim.claimStatus !== "Approved") return res.status(400).json({ success: false, message: "Only approved claims can be settled" });

    claim.claimStatus = "Settled";
    claim.settledBy = req.user._id;
    claim.settlementDate = new Date();
    await claim.save();

    res.status(200).json({ success: true, message: "Insurance claim settled", data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};