import PharmacyInvoice from "../models/PharmacyInvoiceSchema.js";

// CREATE INVOICE
export const createPharmacyInvoice = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const userId = req.user._id;

    const { prescriptionId, patientId, invoiceNumber, totalAmount, discount, taxAmount, netAmount, paymentStatus, invoiceHtml } = req.body;

    if (!patientId || !totalAmount) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const invoice = await PharmacyInvoice.create({
      hospitalId,
      branchId,
      prescriptionId,
      patientId,
      invoiceNumber,
      totalAmount,
      discount,
      taxAmount,
      netAmount,
      paymentStatus,
      invoiceHtml,
      createdBy: userId
    });

    res.status(201).json({ success: true, message: "Invoice created successfully", data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL INVOICES (FILTER + PAGINATION)
export const getPharmacyInvoices = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const { patientId, paymentStatus, fromDate, toDate, page = 1, limit = 10 } = req.query;

    const filter = { hospitalId, branchId };
    if (patientId) filter.patientId = patientId;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (fromDate && toDate) filter.createdAt = { $gte: new Date(fromDate), $lte: new Date(toDate) };

    const invoices = await PharmacyInvoice.find(filter)
      .populate("patientId", "patientName uhid")
      .populate("prescriptionId", "visitId")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await PharmacyInvoice.countDocuments(filter);

    res.status(200).json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
export const getPharmacyInvoiceById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const invoice = await PharmacyInvoice.findOne({ _id: req.params.id, hospitalId, branchId })
      .populate("patientId", "patientName uhid")
      .populate("prescriptionId", "visitId")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });

    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE INVOICE
export const updatePharmacyInvoice = async (req, res) => {
  try {
    const invoice = await PharmacyInvoice.findOne({ _id: req.params.id, hospitalId: req.user.hospitalId, branchId: req.user.branchId });

    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });

    const { totalAmount, discount, taxAmount, netAmount, paymentStatus, invoiceHtml } = req.body;

    if (totalAmount !== undefined) invoice.totalAmount = totalAmount;
    if (discount !== undefined) invoice.discount = discount;
    if (taxAmount !== undefined) invoice.taxAmount = taxAmount;
    if (netAmount !== undefined) invoice.netAmount = netAmount;
    if (paymentStatus) invoice.paymentStatus = paymentStatus;
    if (invoiceHtml) invoice.invoiceHtml = invoiceHtml;

    invoice.updatedBy = req.user._id;

    await invoice.save();

    res.status(200).json({ success: true, message: "Invoice updated successfully", data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE ONLY INVOICE HTML
export const updateInvoiceHtml = async (req, res) => {
  try {
    const { invoiceHtml } = req.body;

    if (!invoiceHtml) return res.status(400).json({ success: false, message: "invoiceHtml is required" });

    const invoice = await PharmacyInvoice.findOne({ _id: req.params.id, hospitalId: req.user.hospitalId, branchId: req.user.branchId });

    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });

    invoice.invoiceHtml = invoiceHtml;
    invoice.updatedBy = req.user._id;

    await invoice.save();

    res.status(200).json({ success: true, message: "Invoice HTML updated successfully", data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE INVOICE
export const deletePharmacyInvoice = async (req, res) => {
  try {
    const invoice = await PharmacyInvoice.findOneAndDelete({ _id: req.params.id, hospitalId: req.user.hospitalId, branchId: req.user.branchId });
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });

    res.status(200).json({ success: true, message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};