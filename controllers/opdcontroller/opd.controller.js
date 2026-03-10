import Complaint from "../../models/Complaint.js";
import CurrentTreatment from "../../models/CurrentTreatment.js";
import Diagnosis from "../../models/Diagnosis.js";
import DoctorNotes from "../../models/DoctorNotes.js";
import InvestigationOrder from "../../models/InvestigationOrder.js";
import PatientVisit from "../../models/PatientVisitSchema.js";
import User from "../../models/User.js";

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

export const createOrUpdateVisitSummary = async (req, res) => {
  try {
    const { visitId, complaints, treatments, diagnoses, notes, investigations } = req.body;
    const userId = req.user.id || req.user._id;

    // 1. Validate Visit and get hospital/branch context
    const visit = await PatientVisit.findById(visitId);
    if (!visit) {
      console.log(`[DEBUG] Visit not found for ID: ${visitId}`);
      return res.status(404).json({ message: "Visit not found" });
    }

    // Try to get hospitalId/branchId from visit, fallback to user context if missing
    let hospitalId = visit.hospitalId;
    let branchId = visit.branchId;

    console.log(`[DEBUG] Visit IDs - hospitalId: ${hospitalId}, branchId: ${branchId}`);

    if (!hospitalId || !branchId) {
      // Fallback: Get from logged in user if visit is missing them (legacy data)
      console.log(`[DEBUG] Missing IDs in visit, checking user: ${userId}`);
      const user = await User.findById(userId);
      if (user) {
        console.log(`[DEBUG] User found. User IDs - hospitalId: ${user.hospitalId}, branchId: ${user.branchId}`);
        hospitalId = hospitalId || user.hospitalId;
        branchId = branchId || user.branchId;
      } else {
        console.log(`[DEBUG] User not found for ID: ${userId}`);
      }
    }

    if (!hospitalId || !branchId) {
      console.log(`[DEBUG] FINAL CHECK FAILED - hospitalId: ${hospitalId}, branchId: ${branchId}`);
      return res.status(400).json({ 
        message: "Hospital and Branch IDs are required.",
        debug: {
          visit_hospitalId: visit.hospitalId,
          visit_branchId: visit.branchId,
          user_id: userId,
          has_hospitalId: !!hospitalId,
          has_branchId: !!branchId
        }
      });
    }

    // 2. Clear existing data for this visit and doctor
    await Promise.all([
      Complaint.deleteMany({ visitId }),
      CurrentTreatment.deleteMany({ visitId }),
      Diagnosis.deleteMany({ visitId }),
      DoctorNotes.deleteMany({ visitId, userId }),
      InvestigationOrder.deleteMany({ visitId }),
    ]);

    // 3. Create new records
    const patientId = visit.patientId;
    const createdDocs = {};

    if (complaints && complaints.length > 0) {
      // Complaint model expects { complaints: [String] } per document, 
      // but here we likely receive an array of complaint strings or objects.
      // Based on the schema: { complaints: [String] }
      // If the input is ["Fever", "Cough"], we create one document with that array.
      createdDocs.complaints = await Complaint.create({
        visitId,
        complaints: Array.isArray(complaints) ? complaints : [complaints], 
        createdByUser: userId,
        hospitalId,
        branchId
      });
    }

    if (treatments && treatments.length > 0) {
      // CurrentTreatment schema has "medicines" as [Object]
      // We assume the input 'treatments' is an array of medicine objects
      createdDocs.treatments = await CurrentTreatment.create({
        visitId,
        patientId,
        doctorId: userId, 
        medicines: treatments,
        hospitalId,
        branchId
      });
    }

    if (diagnoses && diagnoses.length > 0) {
      // Diagnosis schema is one document per diagnosis or we map them?
      // Schema has single fields: diagnosisType, diagnosisName, icdCode, notes
      // So we map the array to create multiple documents
      createdDocs.diagnoses = await Diagnosis.create(diagnoses.map(d => ({
        ...d,
        visitId,
        patientId,
        hospitalId,
        branchId
      })));
    }

    if (notes) {
      createdDocs.notes = await DoctorNotes.create({
        ...notes,
        visitId,
        userId: userId,
        hospitalId,
        branchId
      });
    }

    if (investigations && investigations.length > 0) {
      // InvestigationOrder schema requires: hospitalId, branchId, patientId, encounterType="OPD", investigationId, priceAtOrderTime, source, createdBy
      // We assume the input 'investigations' contains investigationId and priceAtOrderTime
      createdDocs.investigations = await InvestigationOrder.create(investigations.map(i => ({
        ...i,
        visitId,
        patientId,
        hospitalId,
        branchId,
        encounterType: "OPD",
        source: "Digital",
        createdBy: userId
      })));
    }

    return res.status(201).json({ message: "Visit summary saved successfully", data: createdDocs });

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
