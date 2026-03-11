import PharmacyStock from "../../models/pharmacy/PharmacyStockBatchWise.js";

// CREATE STOCK
export const createPharmacyStock = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const pharmacyId = req.user.pharmacyId; // assigned pharmacy
    const userId = req.user._id;

    const {
      medicineId,
      batchNumber,
      expiryDate,
      availableQuantity,
      purchasePrice,
      sellingPrice,
      supplierId
    } = req.body;

    if (!medicineId || !batchNumber || !expiryDate || !availableQuantity) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const stock = await PharmacyStock.create({
      hospitalId,
      branchId,
      pharmacyId,
      medicineId,
      batchNumber,
      expiryDate,
      availableQuantity,
      purchasePrice,
      sellingPrice,
      supplierId
    });

    res.status(201).json({
      success: true,
      message: "Pharmacy stock created successfully",
      data: stock
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL STOCKS (FILTER + PAGINATION)
export const getPharmacyStocks = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const pharmacyId = req.user.pharmacyId;

    const { medicineId, supplierId, status, page = 1, limit = 10, search } = req.query;

    const filter = { hospitalId, branchId, pharmacyId };

    if (medicineId) filter.medicineId = medicineId;
    if (supplierId) filter.supplierId = supplierId;
    if (status) filter.status = status;

    if (search) {
      filter.$or = [
        { batchNumber: { $regex: search, $options: "i" } }
      ];
    }

    const stocks = await PharmacyStock.find(filter)
      .populate("medicineId", "name brandName")
      .populate("supplierId", "supplierName contactPerson")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await PharmacyStock.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: stocks
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET STOCK BY ID
export const getPharmacyStockById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const pharmacyId = req.user.pharmacyId;

    const stock = await PharmacyStock.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
      pharmacyId
    })
      .populate("medicineId", "name brandName")
      .populate("supplierId", "supplierName contactPerson");

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found"
      });
    }

    res.status(200).json({ success: true, data: stock });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE STOCK
export const updatePharmacyStock = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const pharmacyId = req.user.pharmacyId;

    const stock = await PharmacyStock.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
      pharmacyId
    });

    if (!stock) {
      return res.status(404).json({ success: false, message: "Stock not found" });
    }

    // Update fields
    stock.batchNumber = req.body.batchNumber ?? stock.batchNumber;
    stock.expiryDate = req.body.expiryDate ?? stock.expiryDate;
    stock.availableQuantity = req.body.availableQuantity ?? stock.availableQuantity;
    stock.purchasePrice = req.body.purchasePrice ?? stock.purchasePrice;
    stock.sellingPrice = req.body.sellingPrice ?? stock.sellingPrice;
    stock.supplierId = req.body.supplierId ?? stock.supplierId;

    await stock.save();

    res.status(200).json({
      success: true,
      message: "Pharmacy stock updated successfully",
      data: stock
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE STOCK
export const deletePharmacyStock = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const pharmacyId = req.user.pharmacyId;

    const stock = await PharmacyStock.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
      pharmacyId
    });

    if (!stock) {
      return res.status(404).json({ success: false, message: "Stock not found" });
    }

    res.status(200).json({
      success: true,
      message: "Pharmacy stock deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};