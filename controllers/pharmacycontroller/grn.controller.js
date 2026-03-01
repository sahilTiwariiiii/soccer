import GRN from "../models/GRNSchema.js";

// CREATE GRN
export const createGRN = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const userId = req.user._id;

    const { purchaseOrderId, invoiceNumber, invoiceDate, totalAmount, grnNotes } = req.body;

    if (!purchaseOrderId || !invoiceNumber || !totalAmount) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const grn = await GRN.create({
      hospitalId,
      branchId,
      purchaseOrderId,
      invoiceNumber,
      invoiceDate,
      totalAmount,
      grnNotes,
      receivedBy: userId
    });

    res.status(201).json({ success: true, message: "GRN created successfully", data: grn });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL GRNs (FILTER + PAGINATION)
export const getGRNs = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const { purchaseOrderId, fromDate, toDate, page = 1, limit = 10 } = req.query;

    const filter = { hospitalId, branchId };
    if (purchaseOrderId) filter.purchaseOrderId = purchaseOrderId;
    if (fromDate && toDate) {
      filter.invoiceDate = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }

    const grns = await GRN.find(filter)
      .populate("purchaseOrderId", "orderNumber orderDate totalAmount")
      .populate("receivedBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await GRN.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: grns
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET GRN BY ID
export const getGRNById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const grn = await GRN.findOne({ _id: req.params.id, hospitalId, branchId })
      .populate("purchaseOrderId", "orderNumber orderDate totalAmount")
      .populate("receivedBy", "name email");

    if (!grn) return res.status(404).json({ success: false, message: "GRN not found" });

    res.status(200).json({ success: true, data: grn });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE GRN
export const updateGRN = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const grn = await GRN.findOne({ _id: req.params.id, hospitalId });

    if (!grn) return res.status(404).json({ success: false, message: "GRN not found" });

    // Allow updates only if some processing is not done (you can add a status check if needed)
    const fields = ["purchaseOrderId", "invoiceNumber", "invoiceDate", "totalAmount", "grnNotes"];
    fields.forEach(f => {
      if (req.body[f] !== undefined) grn[f] = req.body[f];
    });

    grn.receivedBy = req.user._id; // track who updated
    await grn.save();

    res.status(200).json({ success: true, message: "GRN updated successfully", data: grn });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE GRN (Soft delete optional)
export const deleteGRN = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const grn = await GRN.findOne({ _id: req.params.id, hospitalId });

    if (!grn) return res.status(404).json({ success: false, message: "GRN not found" });

    await grn.deleteOne(); // or set isActive = false if soft delete

    res.status(200).json({ success: true, message: "GRN deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};