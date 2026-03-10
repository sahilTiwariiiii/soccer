import PatientVisit from "../models/PatientVisitSchema.js";
import IPDAdmission from "../models/ipdmanagement/IPDAdmission.js";

/**
 * Get all OPD Patients (Active/Recent Visits)
 */
export const getOPDPatients = async (req, res) => {
    try {
        const { hospitalId, branchId } = req.user;
        const { status, fromDate, toDate } = req.query;

        const filter = {
            hospitalId,
            branchId,
            visitType: "OPD"
        };

        if (status) filter.status = status;
        if (fromDate || toDate) {
            filter.visitDate = {};
            if (fromDate) filter.visitDate.$gte = new Date(fromDate);
            if (toDate) filter.visitDate.$lte = new Date(toDate);
        }

        const patients = await PatientVisit.find(filter)
            .populate("patientId")
            .populate("doctorId", "name email")
            .populate("departmentId", "name")
            .sort({ visitDate: -1, visitTime: -1 });

        return res.status(200).json(patients);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Get all IPD Patients (Currently Admitted)
 */
export const getIPDPatients = async (req, res) => {
    try {
        const { hospitalId, branchId } = req.user;
        const { status } = req.query; // ADMITTED or DISCHARGED

        const filter = {
            hospitalId,
            branchId,
            status: status || "ADMITTED"
        };

        const admissions = await IPDAdmission.find(filter)
            .populate("patientId")
            .populate("visitId")
            .populate("bedId")
            .populate("treatingDoctors", "name email")
            .sort({ admissionDate: -1 });

        return res.status(200).json(admissions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
