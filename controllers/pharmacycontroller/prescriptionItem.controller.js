import PrescriptionItem from "../../models/pharmacy/PrescriptionItems.js";
import Prescription from "../../models/pharmacy/PrescriptionHeader.js";

// CREATE PRESCRIPTION ITEM
const createPrescriptionItem = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const userId = req.user._id;

    const {
      prescriptionId,
      medicineId,
      medicineName,
      form,
      strength,
      dosage,
      frequency,
      duration,
      route,
      quantityPrescribed
    } = req.body;

    if (!prescriptionId || !medicineId || !quantityPrescribed) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    // Ensure prescription belongs to user's hospital/branch
    const prescription = await Prescription.findOne({ _id: prescriptionId, hospitalId, branchId });
    if (!prescription) return res.status(404).json({ success: false, message: "Prescription not found" });

    const item = await PrescriptionItem.create({
      prescriptionId,
      medicineId,
      medicineName,
      form,
      strength,
      dosage,
      frequency,
      duration,
      route,
      quantityPrescribed,
      quantityDispensed: 0,
      itemStatus: "Pending",
      createdBy: userId
    });

    res.status(201).json({ success: true, message: "Prescription item created", data: item });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL PRESCRIPTION ITEMS
const getPrescriptionItems = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const { prescriptionId, itemStatus, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (prescriptionId) filter.prescriptionId = prescriptionId;
    if (itemStatus) filter.itemStatus = itemStatus;

    // Only include items that belong to prescriptions of this hospital/branch
    const prescriptions = await Prescription.find({ hospitalId, branchId }).select("_id");
    filter.prescriptionId = { $in: prescriptions.map(p => p._id) };

    const items = await PrescriptionItem.find(filter)
      .populate("prescriptionId", "visitId patientId doctorId status")
      .populate("medicineId", "name genericName")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await PrescriptionItem.countDocuments(filter);

    res.status(200).json({ success: true, total, page: Number(page), pages: Math.ceil(total/limit), data: items });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ITEM BY ID
const getPrescriptionItemById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const item = await PrescriptionItem.findById(req.params.id)
      .populate("prescriptionId", "visitId patientId doctorId status")
      .populate("medicineId", "name genericName")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    // Ensure item belongs to this hospital/branch
    const prescription = await Prescription.findOne({ _id: item.prescriptionId, hospitalId, branchId });
    if (!prescription) return res.status(403).json({ success: false, message: "Access denied" });

    res.status(200).json({ success: true, data: item });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// MARK AS DISPENSED
const markItemAsDispensed = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const userId = req.user._id;
    const { quantityDispensed } = req.body;

    const item = await PrescriptionItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    const prescription = await Prescription.findOne({ _id: item.prescriptionId, hospitalId, branchId });
    if (!prescription) return res.status(403).json({ success: false, message: "Access denied" });

    if (quantityDispensed > item.quantityPrescribed) {
      return res.status(400).json({ success: false, message: "Dispensed cannot exceed prescribed" });
    }

    item.quantityDispensed = quantityDispensed;
    item.itemStatus = quantityDispensed === item.quantityPrescribed ? "Dispensed" : "PartiallyDispensed";
    item.updatedBy = userId;

    await item.save();

    res.status(200).json({ success: true, message: "Item dispensed updated", data: item });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE ITEM (Soft delete optional)
const deletePrescriptionItem = async (req, res) => {
  try {
    const item = await PrescriptionItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    // Optional: soft delete by marking status as "Cancelled"
    item.itemStatus = "Cancelled";
    item.updatedBy = req.user._id;
    await item.save();

    res.status(200).json({ success: true, message: "Item cancelled", data: item });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createPrescriptionItem,
  getPrescriptionItems,
  getPrescriptionItemById,
  markItemAsDispensed,
  deletePrescriptionItem
};