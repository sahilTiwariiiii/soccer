import PharmacyDispense from "../../models/pharmacy/PharmacyDispenseRecord.js";

// CREATE DISPENSE RECORD
export const createPharmacyDispense = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const userId = req.user._id;
    const { pharmacyId, prescriptionId, prescriptionItemId, stockId, batchNumber, quantityGiven, dispenseNotes } = req.body;

    if (!pharmacyId || !prescriptionId || !prescriptionItemId || !stockId || !quantityGiven) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const dispense = await PharmacyDispense.create({
      hospitalId,
      branchId,
      pharmacyId,
      prescriptionId,
      prescriptionItemId,
      stockId,
      batchNumber,
      quantityGiven,
      dispenseNotes,
      dispensedBy: userId
    });

    res.status(201).json({ success: true, message: "Dispense record created", data: dispense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL DISPENSES (FILTER + PAGINATION)
export const getPharmacyDispenses = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;
    const { pharmacyId, prescriptionId, prescriptionItemId, fromDate, toDate, page = 1, limit = 10 } = req.query;

    const filter = { hospitalId, branchId };
    if (pharmacyId) filter.pharmacyId = pharmacyId;
    if (prescriptionId) filter.prescriptionId = prescriptionId;
    if (prescriptionItemId) filter.prescriptionItemId = prescriptionItemId;
    if (fromDate && toDate) filter.createdAt = { $gte: new Date(fromDate), $lte: new Date(toDate) };

    const dispenses = await PharmacyDispense.find(filter)
      .populate("pharmacyId", "name")
      .populate({
        path: "prescriptionId",
        select: "visitId patientId doctorId",
        populate: [
          { path: "patientId", select: "uhid patientName age gender" },
          { path: "doctorId", select: "name" }
        ]
      })
      .populate("prescriptionItemId", "medicineName quantityPrescribed")
      .populate("stockId", "medicineId batchNumber availableQuantity")
      .populate("dispensedBy", "name email")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await PharmacyDispense.countDocuments(filter);

    res.status(200).json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), data: dispenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
export const getPharmacyDispenseById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const dispense = await PharmacyDispense.findOne({ _id: req.params.id, hospitalId, branchId })
      .populate("pharmacyId", "name")
      .populate("prescriptionId", "visitId")
      .populate("prescriptionItemId", "medicineName quantityPrescribed")
      .populate("stockId", "medicineId batchNumber availableQuantity")
      .populate("dispensedBy", "name email");

    if (!dispense) return res.status(404).json({ success: false, message: "Dispense record not found" });

    res.status(200).json({ success: true, data: dispense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE DISPENSE (quantity or notes)
export const updatePharmacyDispense = async (req, res) => {
  try {
    const dispense = await PharmacyDispense.findOne({ _id: req.params.id, hospitalId: req.user.hospitalId, branchId: req.user.branchId });

    if (!dispense) return res.status(404).json({ success: false, message: "Dispense record not found" });

    const { quantityGiven, dispenseNotes, batchNumber } = req.body;
    if (quantityGiven !== undefined) dispense.quantityGiven = quantityGiven;
    if (dispenseNotes !== undefined) dispense.dispenseNotes = dispenseNotes;
    if (batchNumber) dispense.batchNumber = batchNumber;

    dispense.updatedBy = req.user._id;

    await dispense.save();

    res.status(200).json({ success: true, message: "Dispense record updated", data: dispense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE DISPENSE
export const deletePharmacyDispense = async (req, res) => {
  try {
    const dispense = await PharmacyDispense.findOneAndDelete({ _id: req.params.id, hospitalId: req.user.hospitalId, branchId: req.user.branchId });

    if (!dispense) return res.status(404).json({ success: false, message: "Dispense record not found" });

    res.status(200).json({ success: true, message: "Dispense record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};