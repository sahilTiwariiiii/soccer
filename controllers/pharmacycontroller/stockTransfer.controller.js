import StockTransfer from "../models/StockTransferSchema.js";

// CREATE STOCK TRANSFER REQUEST
export const createStockTransfer = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const userId = req.user._id;

    const { fromBranchId, toBranchId, medicineId, batchNumber, quantity, stockTransferNotes } = req.body;

    if (!fromBranchId || !toBranchId || !medicineId || !quantity) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const transfer = await StockTransfer.create({
      hospitalId,
      fromBranchId,
      toBranchId,
      medicineId,
      batchNumber,
      quantity,
      stockTransferNotes,
      createdBy: userId
    });

    res.status(201).json({ success: true, message: "Stock transfer request created", data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL STOCK TRANSFERS (FILTER + PAGINATION)
export const getStockTransfers = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const { fromBranchId, toBranchId, status, medicineId, page = 1, limit = 10 } = req.query;

    const filter = { hospitalId };

    if (fromBranchId) filter.fromBranchId = fromBranchId;
    if (toBranchId) filter.toBranchId = toBranchId;
    if (status) filter.status = status;
    if (medicineId) filter.medicineId = medicineId;

    const transfers = await StockTransfer.find(filter)
      .populate("fromBranchId", "name")
      .populate("toBranchId", "name")
      .populate("medicineId", "name genericName brandName")
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await StockTransfer.countDocuments(filter);

    res.status(200).json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), data: transfers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET STOCK TRANSFER BY ID
export const getStockTransferById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;

    const transfer = await StockTransfer.findOne({ _id: req.params.id, hospitalId })
      .populate("fromBranchId", "name")
      .populate("toBranchId", "name")
      .populate("medicineId", "name genericName brandName")
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email");

    if (!transfer) return res.status(404).json({ success: false, message: "Stock transfer not found" });

    res.status(200).json({ success: true, data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE STOCK TRANSFER (editable only if not approved or completed)
export const updateStockTransfer = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const transfer = await StockTransfer.findOne({ _id: req.params.id, hospitalId });

    if (!transfer) return res.status(404).json({ success: false, message: "Stock transfer not found" });

    if (["Approved", "InTransit", "Completed"].includes(transfer.status)) {
      return res.status(400).json({ success: false, message: "Cannot update approved or completed transfer" });
    }

    const fields = ["fromBranchId","toBranchId","medicineId","batchNumber","quantity","stockTransferNotes"];
    fields.forEach(f => {
      if (req.body[f] !== undefined) transfer[f] = req.body[f];
    });

    transfer.updatedBy = req.user._id;
    await transfer.save();

    res.status(200).json({ success: true, message: "Stock transfer updated", data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// APPROVE STOCK TRANSFER
export const approveStockTransfer = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const transfer = await StockTransfer.findOne({ _id: req.params.id, hospitalId });

    if (!transfer) return res.status(404).json({ success: false, message: "Stock transfer not found" });
    if (transfer.status !== "Requested") return res.status(400).json({ success: false, message: "Only requested transfers can be approved" });

    transfer.status = "Approved";
    transfer.approvedBy = req.user._id;
    await transfer.save();

    res.status(200).json({ success: true, message: "Stock transfer approved", data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// MARK AS IN TRANSIT
export const markInTransit = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const transfer = await StockTransfer.findOne({ _id: req.params.id, hospitalId });

    if (!transfer) return res.status(404).json({ success: false, message: "Stock transfer not found" });
    if (transfer.status !== "Approved") return res.status(400).json({ success: false, message: "Only approved transfers can be in transit" });

    transfer.status = "InTransit";
    await transfer.save();

    res.status(200).json({ success: true, message: "Stock transfer marked as InTransit", data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// MARK AS COMPLETED
export const markAsCompleted = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const transfer = await StockTransfer.findOne({ _id: req.params.id, hospitalId });

    if (!transfer) return res.status(404).json({ success: false, message: "Stock transfer not found" });
    if (transfer.status !== "InTransit") return res.status(400).json({ success: false, message: "Only in-transit transfers can be completed" });

    transfer.status = "Completed";
    await transfer.save();

    res.status(200).json({ success: true, message: "Stock transfer completed", data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};