import MedicineMaster from "../../models/pharmacy/MedicineMaster.js";

// CREATE MEDICINE
export const createMedicine = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const userId = req.user._id;

    const {
      name,
      genericName,
      brandName,
      category,
      scheduleType,
      form,
      strength,
      manufacturer,
      hsnCode,
      gstPercentage,
      medicineNotes
    } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Medicine name is required" });
    }

    const medicine = await MedicineMaster.create({
      hospitalId,
      name,
      genericName,
      brandName,
      category,
      scheduleType,
      form,
      strength,
      manufacturer,
      hsnCode,
      gstPercentage,
      medicineNotes,
      createdBy: userId
    });

    res.status(201).json({ success: true, message: "Medicine created successfully", data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL MEDICINES (FILTER + PAGINATION)
export const getMedicines = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;
    const { search, category, scheduleType, isActive, page = 1, limit = 10 } = req.query;

    const filter = { hospitalId };
    if (isActive !== undefined) filter.isActive = isActive === "true";
    if (category) filter.category = category;
    if (scheduleType) filter.scheduleType = scheduleType;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { genericName: { $regex: search, $options: "i" } },
        { brandName: { $regex: search, $options: "i" } }
      ];
    }

    const medicines = await MedicineMaster.find(filter)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await MedicineMaster.countDocuments(filter);

    res.status(200).json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), data: medicines });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET MEDICINE BY ID
export const getMedicineById = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;

    const medicine = await MedicineMaster.findOne({ _id: req.params.id, hospitalId })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!medicine) return res.status(404).json({ success: false, message: "Medicine not found" });

    res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE MEDICINE
export const updateMedicine = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;

    const medicine = await MedicineMaster.findOne({ _id: req.params.id, hospitalId });
    if (!medicine) return res.status(404).json({ success: false, message: "Medicine not found" });

    const fields = ["name","genericName","brandName","category","scheduleType","form","strength","manufacturer","hsnCode","gstPercentage","medicineNotes"];
    fields.forEach(field => {
      if (req.body[field] !== undefined) medicine[field] = req.body[field];
    });

    medicine.updatedBy = req.user._id;
    await medicine.save();

    res.status(200).json({ success: true, message: "Medicine updated successfully", data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// TOGGLE MEDICINE STATUS
export const toggleMedicineStatus = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;

    const medicine = await MedicineMaster.findOne({ _id: req.params.id, hospitalId });
    if (!medicine) return res.status(404).json({ success: false, message: "Medicine not found" });

    medicine.isActive = !medicine.isActive;
    medicine.updatedBy = req.user._id;

    await medicine.save();

    res.status(200).json({ success: true, message: `Medicine ${medicine.isActive ? "Activated" : "Deactivated"}`, data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};