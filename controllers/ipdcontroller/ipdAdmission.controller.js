import IPDAdmission from "../../models/ipdmanagement/IPDAdmission.js";

/* ===============================
   1️⃣ Create IPD Admission
================================ */
export const createIPDAdmission = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;

    const {
      patientId,
      visitId,
      admissionNumber,
      bedId,
      treatingDoctors,
    } = req.body;

    const admission = await IPDAdmission.create({
      hospitalId,
      branchId,
      patientId,
      visitId,
      admissionNumber,
      bedId,
      treatingDoctors,
    });

    res.status(201).json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   2️⃣ Get All Admissions (Filters)
================================ */
export const getIPDAdmissions = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const { status, patientId, fromDate, toDate } = req.query;

    const filter = {
      hospitalId,
      branchId,
    };

    if (status) filter.status = status;
    if (patientId) filter.patientId = patientId;

    if (fromDate || toDate) {
      filter.admissionDate = {};
      if (fromDate) filter.admissionDate.$gte = new Date(fromDate);
      if (toDate) filter.admissionDate.$lte = new Date(toDate);
    }

    const admissions = await IPDAdmission.find(filter)
      .populate("patientId")
      .populate("visitId")
      .populate("bedId")
      .populate("treatingDoctors")
      .sort({ createdAt: -1 });

    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   3️⃣ Get Single Admission
================================ */
export const getSingleIPDAdmission = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const admission = await IPDAdmission.findOne({
      _id: req.params.id,
      hospitalId,
      branchId,
    })
      .populate("patientId")
      .populate("visitId")
      .populate("bedId")
      .populate("treatingDoctors");

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   4️⃣ Update Admission
================================ */
export const updateIPDAdmission = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const updated = await IPDAdmission.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
      },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   5️⃣ Discharge Patient
================================ */
export const dischargeIPDPatient = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const { dischargeSummary } = req.body;

    const admission = await IPDAdmission.findOneAndUpdate(
      {
        _id: req.params.id,
        hospitalId,
        branchId,
        status: "ADMITTED",
      },
      {
        status: "DISCHARGED",
        dischargeDate: new Date(),
        dischargeSummary,
      },
      { new: true }
    );

    if (!admission) {
      return res.status(404).json({ message: "Admission not found or already discharged" });
    }

    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   6️⃣ Delete Admission (Optional)
================================ */
export const deleteIPDAdmission = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const admission = await IPDAdmission.findOneAndDelete({
      _id: req.params.id,
      hospitalId,
      branchId,
      status: "ADMITTED", // safety: don't delete discharged
    });

    if (!admission) {
      return res.status(404).json({ message: "Cannot delete discharged admission" });
    }

    res.json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};