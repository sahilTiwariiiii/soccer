import PurchaseOrderItem from "../models/PurchaseOrderItemSchema.js";
import PurchaseOrder from "../models/PurchaseOrderSchema.js";


// CREATE ITEM
const createPurchaseOrderItem = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const userId = req.user._id;

    const {
      purchaseOrderId,
      medicineId,
      quantityOrdered,
      purchasePrice,
      gstPercentage
    } = req.body;

    if (!purchaseOrderId || !medicineId || !quantityOrdered) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    // check PO belongs to same branch
    const order = await PurchaseOrder.findOne({
      _id: purchaseOrderId,
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
        message: "Cannot add items to non-draft order"
      });
    }

    const totalAmount =
      quantityOrdered *
      purchasePrice *
      (1 + (gstPercentage || 0) / 100);

    const item = await PurchaseOrderItem.create({
      hospitalId,
      branchId,
      purchaseOrderId,
      medicineId,
      quantityOrdered,
      purchasePrice,
      gstPercentage,
      totalAmount,
      createdBy: userId
    });

    res.status(201).json({
      success: true,
      message: "Item added successfully",
      data: item
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// GET ALL ITEMS (FILTERED)
const getPurchaseOrderItems = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const {
      purchaseOrderId,
      medicineId,
      page = 1,
      limit = 10
    } = req.query;

    const filter = { hospitalId, branchId };

    if (purchaseOrderId) filter.purchaseOrderId = purchaseOrderId;
    if (medicineId) filter.medicineId = medicineId;

    const items = await PurchaseOrderItem.find(filter)
      .populate("medicineId", "medicineName")
      .populate("purchaseOrderId", "orderNumber status")
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await PurchaseOrderItem.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: items
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// UPDATE ITEM (Only Draft PO)
const updatePurchaseOrderItem = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const item = await PurchaseOrderItem.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    const order = await PurchaseOrder.findById(item.purchaseOrderId);

    if (order.status !== "Draft") {
      return res.status(400).json({
        success: false,
        message: "Cannot update item after order processed"
      });
    }

    item.quantityOrdered =
      req.body.quantityOrdered ?? item.quantityOrdered;
    item.purchasePrice =
      req.body.purchasePrice ?? item.purchasePrice;
    item.gstPercentage =
      req.body.gstPercentage ?? item.gstPercentage;

    item.totalAmount =
      item.quantityOrdered *
      item.purchasePrice *
      (1 + (item.gstPercentage || 0) / 100);

    await item.save();

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: item
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// RECEIVE STOCK
const receivePurchaseOrderItem = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const { quantityReceived } = req.body;

    const item = await PurchaseOrderItem.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    if (quantityReceived <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity"
      });
    }

    item.quantityReceived += quantityReceived;

    await item.save();

    res.status(200).json({
      success: true,
      message: "Stock received successfully",
      data: item
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// DELETE ITEM (Only Draft)
const deletePurchaseOrderItem = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const item = await PurchaseOrderItem.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    const order = await PurchaseOrder.findById(item.purchaseOrderId);

    if (order.status !== "Draft") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete after order processed"
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export default {
  createPurchaseOrderItem,
  getPurchaseOrderItems,
  updatePurchaseOrderItem,
  receivePurchaseOrderItem,
  deletePurchaseOrderItem
};