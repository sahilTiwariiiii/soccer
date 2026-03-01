import PurchaseOrder from "../models/PurchaseOrderSchema.js";


// CREATE PURCHASE ORDER
const createPurchaseOrder = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const userId = req.user._id;

    const { supplierId, orderNumber, orderDate, totalAmount } = req.body;

    if (!supplierId || !orderNumber) {
      return res.status(400).json({
        success: false,
        message: "Supplier and Order Number are required"
      });
    }

    // prevent duplicate order number in same branch
    const existing = await PurchaseOrder.findOne({
      hospitalId,
      branchId,
      orderNumber
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Order number already exists"
      });
    }

    const purchaseOrder = await PurchaseOrder.create({
      hospitalId,
      branchId,
      supplierId,
      orderNumber,
      orderDate,
      totalAmount,
      createdBy: userId
    });

    res.status(201).json({
      success: true,
      message: "Purchase Order created successfully",
      data: purchaseOrder
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// GET ALL PURCHASE ORDERS (FILTERED)
const getPurchaseOrders = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const {
      status,
      supplierId,
      fromDate,
      toDate,
      page = 1,
      limit = 10
    } = req.query;

    const filter = { hospitalId, branchId };

    if (status) filter.status = status;
    if (supplierId) filter.supplierId = supplierId;

    if (fromDate && toDate) {
      filter.orderDate = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const orders = await PurchaseOrder.find(filter)
      .populate("supplierId", "supplierName")
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await PurchaseOrder.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: orders
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// GET BY ID (SECURE)
const getPurchaseOrderById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const order = await PurchaseOrder.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    })
      .populate("supplierId", "supplierName contactPerson phone")
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Purchase Order not found"
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// UPDATE (Only Draft Allowed)
const updatePurchaseOrder = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const order = await PurchaseOrder.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Purchase Order not found"
      });
    }

    if (order.status !== "Draft") {
      return res.status(400).json({
        success: false,
        message: "Only Draft orders can be updated"
      });
    }

    Object.assign(order, {
      supplierId: req.body.supplierId ?? order.supplierId,
      orderDate: req.body.orderDate ?? order.orderDate,
      totalAmount: req.body.totalAmount ?? order.totalAmount
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: "Purchase Order updated successfully",
      data: order
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// APPROVE ORDER
const approvePurchaseOrder = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const userId = req.user._id;

    const order = await PurchaseOrder.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Purchase Order not found"
      });
    }

    if (order.status !== "Draft") {
      return res.status(400).json({
        success: false,
        message: "Only Draft orders can be approved"
      });
    }

    order.status = "Ordered";
    order.approvedBy = userId;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Purchase Order approved successfully",
      data: order
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// CANCEL ORDER
const cancelPurchaseOrder = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const order = await PurchaseOrder.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Purchase Order not found"
      });
    }

    if (order.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Completed order cannot be cancelled"
      });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Purchase Order cancelled successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export default {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder,
  approvePurchaseOrder,
  cancelPurchaseOrder
};