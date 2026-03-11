import SupplierSchema from "../../models/pharmacy/SupplierSchema.js";


// CREATE
export const createSupplier = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const {
      supplierName,
      contactPerson,
      phone,
      email,
      address,
      gstNumber
    } = req.body;

    if (!supplierName) {
      return res.status(400).json({
        success: false,
        message: "Supplier Name is required"
      });
    }

    const supplier = await SupplierSchema.create({
      hospitalId,
      branchId,
      supplierName,
      contactPerson,
      phone,
      email,
      address,
      gstNumber,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data: supplier
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// GET ALL (Auto Filter by Token)
export const getSuppliers = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const {
      search,
      isActive,
      page = 1,
      limit = 10
    } = req.query;

    const filter = { hospitalId, branchId };

    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    if (search) {
      filter.$or = [
        { supplierName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { gstNumber: { $regex: search, $options: "i" } }
      ];
    }

    const suppliers = await SupplierSchema.find(filter)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await SupplierSchema.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: suppliers
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID (Secure Branch Check)
export const getSupplierById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const supplier = await SupplierSchema.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found"
      });
    }

    res.status(200).json({
      success: true,
      data: supplier
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE (Secure + Token Based)
export const updateSupplier = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const supplier = await SupplierSchema.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found"
      });
    }

    Object.assign(supplier, {
      supplierName: req.body.supplierName ?? supplier.supplierName,
      contactPerson: req.body.contactPerson ?? supplier.contactPerson,
      phone: req.body.phone ?? supplier.phone,
      email: req.body.email ?? supplier.email,
      address: req.body.address ?? supplier.address,
      gstNumber: req.body.gstNumber ?? supplier.gstNumber,
      updatedBy: req.user._id
    });

    await supplier.save();

    res.status(200).json({
      success: true,
      message: "Supplier updated successfully",
      data: supplier
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// TOGGLE STATUS
export const toggleSupplierStatus = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const supplier = await SupplierSchema.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found"
      });
    }

    supplier.isActive = !supplier.isActive;
    supplier.updatedBy = req.user._id;

    await supplier.save();

    res.status(200).json({
      success: true,
      message: `Supplier ${supplier.isActive ? "Activated" : "Deactivated"} successfully`,
      data: supplier
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// SOFT DELETE
export const deleteSupplier = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const supplier = await SupplierSchema.findOne({
      _id: req.params.id,
      hospitalId,
      branchId
    });

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found"
      });
    }

    supplier.isActive = false;
    supplier.updatedBy = req.user._id;

    await supplier.save();

    res.status(200).json({
      success: true,
      message: "Supplier deactivated successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};