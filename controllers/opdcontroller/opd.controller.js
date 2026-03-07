import Complaint from "../../models/Complaint.js";
import CurrentTreatment from "../../models/CurrentTreatment.js";
import Diagnosis from "../../models/Diagnosis.js";
import DoctorNotes from "../../models/DoctorNotes.js";
import InvestigationOrder from "../../models/InvestigationOrder.js";

export const getVisitSummary = async (req, res) => {
  try {
    const visitId = req.params.visitId;
    const complaints = await Complaint.find({ visitId }).sort({ createdAt: -1 });
    const treatments = await CurrentTreatment.find({ visitId }).sort({ createdAt: -1 });
    const diagnoses = await Diagnosis.find({ visitId }).sort({ createdAt: -1 });
    const notes = await DoctorNotes.find({ visitId }).sort({ createdAt: -1 });
    const investigations = await InvestigationOrder.find({ visitId }).sort({ createdAt: -1 });

    return res.status(200).json({
      complaints,
      treatments,
      diagnoses,
      notes,
      investigations
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
