import StockAdjustment from "../models/StockAdjustment.js";
import PharmacyStock from "../models/PharmacyStock.js";


// CREATE STOCK ADJUSTMENT (Token Based)
const createStockAdjustment = async (req, res) => {
  try {
    const { stockId, adjustmentType, quantity, reason } = req.body;

    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const userId = req.user.userId;

    if (!stockId || !adjustmentType || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const stock = await PharmacyStock.findOne({
      _id: stockId,
      hospitalId,
      branchId
    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found in your branch"
      });
    }

    // Stock Logic
    if (adjustmentType === "Damage" || adjustmentType === "Expired") {
      if (stock.quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock quantity"
        });
      }
      stock.quantity -= quantity;
    }

    if (adjustmentType === "AuditCorrection") {
      stock.quantity = quantity;
    }

    await stock.save();

    const adjustment = await StockAdjustment.create({
      hospitalId,
      branchId,
      stockId,
      adjustmentType,
      quantity,
      reason,
      createdBy: userId,
      approvedBy: userId
    });

    res.status(201).json({
      success: true,
      message: "Stock adjusted successfully",
      data: adjustment
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// GET ALL (Auto Branch Filtered)
const getStockAdjustments = async (req, res) => {
  try {
    const { adjustmentType, page = 1, limit = 10 } = req.query;

    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const filter = {
      hospitalId,
      branchId
    };

    if (adjustmentType) {
      filter.adjustmentType = adjustmentType;
    }

    const adjustments = await StockAdjustment.find(filter)
      .populate("stockId")
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await StockAdjustment.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: adjustments
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// GET BY ID (Branch Protected)
const getStockAdjustmentById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const adjustment = await StockAdjustment.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    })
      .populate("stockId")
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email");

    if (!adjustment) {
      return res.status(404).json({
        success: false,
        message: "Adjustment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: adjustment
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const closeStockAdjustment = async (req, res) => {
    try {
      const hospitalId = req.user.hospitalId;
      const branchId = req.user.branchId;
  
      const adjustment = await StockAdjustment.findOne({
        _id: req.params.id,
        hospitalId,
        branchId
      });
  
      if (!adjustment) {
        return res.status(404).json({
          success: false,
          message: "Adjustment not found"
        });
      }
  
      if (adjustment.status === "Closed") {
        return res.status(400).json({
          success: false,
          message: "Already closed"
        });
      }
  
      adjustment.status = "Closed";
      adjustment.approvedBy = req.user.userId;
  
      await adjustment.save();
  
      res.status(200).json({
        success: true,
        message: "Stock Adjustment closed successfully",
        data: adjustment
      });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

export default {
    createStockAdjustment,
    getStockAdjustments,
    getStockAdjustmentById,
    closeStockAdjustment
  };