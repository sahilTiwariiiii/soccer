import Pharmacy from "../models/PharmacySchema.js";

// CREATE PHARMACY
export const createPharmacy = async (req, res) => {
  try {
    const branchId = req.user.branchId;
    const userId = req.user._id;

    const { name, pharmacyLicenseNumber, drugLicenseValidTill, licenseDocumentUrl, pharmacistInCharge, pharmacyNotes } = req.body;

    if (!name || !pharmacyLicenseNumber) {
      return res.status(400).json({ success: false, message: "Name and License Number are required" });
    }

    const pharmacy = await Pharmacy.create({
      branchId,
      name,
      pharmacyLicenseNumber,
      drugLicenseValidTill,
      licenseDocumentUrl,
      pharmacistInCharge,
      pharmacyNotes,
      createdBy: userId
    });

    res.status(201).json({ success: true, message: "Pharmacy created successfully", data: pharmacy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL PHARMACIES (FILTER + PAGINATION)
export const getPharmacies = async (req, res) => {
  try {
    const branchId = req.user.branchId;
    const { search, isActive, page = 1, limit = 10 } = req.query;

    const filter = { branchId };
    if (isActive !== undefined) filter.isActive = isActive === "true";

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { pharmacyLicenseNumber: { $regex: search, $options: "i" } },
        { "pharmacistInCharge.name": { $regex: search, $options: "i" } }
      ];
    }

    const pharmacies = await Pharmacy.find(filter)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Pharmacy.countDocuments(filter);

    res.status(200).json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), data: pharmacies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET PHARMACY BY ID
export const getPharmacyById = async (req, res) => {
  try {
    const branchId = req.user.branchId;

    const pharmacy = await Pharmacy.findOne({ _id: req.params.id, branchId })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!pharmacy) return res.status(404).json({ success: false, message: "Pharmacy not found" });

    res.status(200).json({ success: true, data: pharmacy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE PHARMACY
export const updatePharmacy = async (req, res) => {
  try {
    const branchId = req.user.branchId;

    const pharmacy = await Pharmacy.findOne({ _id: req.params.id, branchId });
    if (!pharmacy) return res.status(404).json({ success: false, message: "Pharmacy not found" });

    const { name, pharmacyLicenseNumber, drugLicenseValidTill, licenseDocumentUrl, pharmacistInCharge, pharmacyNotes } = req.body;

    if (name) pharmacy.name = name;
    if (pharmacyLicenseNumber) pharmacy.pharmacyLicenseNumber = pharmacyLicenseNumber;
    if (drugLicenseValidTill) pharmacy.drugLicenseValidTill = drugLicenseValidTill;
    if (licenseDocumentUrl) pharmacy.licenseDocumentUrl = licenseDocumentUrl;
    if (pharmacistInCharge) pharmacy.pharmacistInCharge = pharmacistInCharge;
    if (pharmacyNotes) pharmacy.pharmacyNotes = pharmacyNotes;

    pharmacy.updatedBy = req.user._id;

    await pharmacy.save();

    res.status(200).json({ success: true, message: "Pharmacy updated successfully", data: pharmacy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// TOGGLE ACTIVE STATUS
export const togglePharmacyStatus = async (req, res) => {
  try {
    const branchId = req.user.branchId;

    const pharmacy = await Pharmacy.findOne({ _id: req.params.id, branchId });
    if (!pharmacy) return res.status(404).json({ success: false, message: "Pharmacy not found" });

    pharmacy.isActive = !pharmacy.isActive;
    pharmacy.updatedBy = req.user._id;

    await pharmacy.save();

    res.status(200).json({ success: true, message: `Pharmacy ${pharmacy.isActive ? "Activated" : "Deactivated"}`, data: pharmacy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};