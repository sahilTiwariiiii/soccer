import mongoose from "mongoose";
import PatientRegistration from "../../models/PatientRegistration.js";
import PatientVisit from "../../models/PatientVisitSchema.js";
import IPDAdmission from "../../models/ipdmanagement/IPDAdmission.js";
import Bed from "../../models/branches/BedSchema.js";
import PatientReceipt from "../../models/PatientReceipt.js";
import { generatepatientuhid } from "../../services/generatepatientuhid.js";
import { generateUniqueReceiptNumber } from "../../services/generateuniquereceiptid.js";
import { generateAdmissionNumber } from "../../services/generateAdmissionNumber.service.js";

/**
 * Unified IPD Quick Admission API
 * Handles: Registration (if new) + Visit Creation (IPD) + Bed Admission
 */
export const ipdQuickAdmissionController = async (req, res) => {
    const {
        // Registration Fields
        uhid, mobile, email, patientName, gender, maritalStatus, dob, age, currentAge,
        relationType, guardianName, address, country, stateId, cityId, bloodGroup,
        source, referredDoctorId, referralMobile, remark, patientImage,

        // Visit Fields
        visitDate, visitTime, fee, departmentId, departmentName, doctorId, slot,
        paymentMode, discountPercent,

        // Admission Fields
        bedId, treatingDoctors
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { hospitalId, branchId, _id: userId } = req.user;

        // Sanitize ObjectIds
        const sanitizedDoctorId = doctorId && mongoose.isValidObjectId(doctorId) ? doctorId : undefined;
        const sanitizedDepartmentId = departmentId && mongoose.isValidObjectId(departmentId) ? departmentId : undefined;
        const sanitizedCountryId = country && mongoose.isValidObjectId(country) ? country : undefined;
        const sanitizedStateId = stateId && mongoose.isValidObjectId(stateId) ? stateId : undefined;
        const sanitizedCityId = cityId && mongoose.isValidObjectId(cityId) ? cityId : undefined;
        const sanitizedReferredDoctorId = referredDoctorId && mongoose.isValidObjectId(referredDoctorId) ? referredDoctorId : undefined;
        const sanitizedBedId = bedId && mongoose.isValidObjectId(bedId) ? bedId : undefined;

        // Sanitize treatingDoctors array
        let sanitizedTreatingDoctors = [];
        if (Array.isArray(treatingDoctors)) {
            sanitizedTreatingDoctors = treatingDoctors.filter(id => mongoose.isValidObjectId(id));
        } else if (treatingDoctors && mongoose.isValidObjectId(treatingDoctors)) {
            sanitizedTreatingDoctors = [treatingDoctors];
        }
        
        if (sanitizedTreatingDoctors.length === 0) {
            sanitizedTreatingDoctors = [userId];
        }

        // 1. Identify or Create Patient
        let patient;
        if (uhid) {
            patient = await PatientRegistration.findOne({ uhid }).session(session);
            if (!patient) {
                throw new Error("Patient with provided UHID not found.");
            }
        } else {
            // New Patient Registration
            const newUhid = await generatepatientuhid();
            patient = await PatientRegistration.create([{
                uhid: newUhid, mobile, email, patientName, gender, maritalStatus, dob, age, currentAge,
                relationType, guardianName, address, 
                country: sanitizedCountryId, 
                stateId: sanitizedStateId, 
                cityId: sanitizedCityId, 
                bloodGroup,
                source, 
                referredDoctorId: sanitizedReferredDoctorId, 
                referralMobile, discountPercent, remark, patientImage
            }], { session });
            patient = patient[0];
        }

        // 2. Create Patient Visit (IPD)
        const receiptNo = await generateUniqueReceiptNumber();
        const patientVisit = await PatientVisit.create([{
            patientId: patient._id,
            uhid: patient.uhid,
            hospitalId,
            branchId,
            visitDate: visitDate || new Date(),
            visitTime: visitTime || new Date().toLocaleTimeString(),
            visitType: "IPD",
            departmentId: sanitizedDepartmentId,
            departmentName,
            doctorId: sanitizedDoctorId,
            fee,
            paymentMode,
            receiptNo,
            status: "In Progress" // Admitted patients are always 'In Progress'
        }], { session });
        const visit = patientVisit[0];

        // 3. Create Patient Receipt
        await PatientReceipt.create([{
            receiptNumber: receiptNo,
            patientId: patient._id,
            uhid: patient.uhid,
            visitId: visit._id,
            departmentId: sanitizedDepartmentId,
            doctorId: sanitizedDoctorId,
            paymentMode,
            discountPercent,
            fee,
            remarks: remark,
            createdBy: userId
        }], { session });

        // 4. Handle Bed Allocation
        if (sanitizedBedId) {
            const bed = await Bed.findById(sanitizedBedId).session(session);
            if (!bed) throw new Error("Bed not found.");
            if (bed.status !== "Available") {
                throw new Error(`Bed is already ${bed.status}`);
            }
            bed.status = "Occupied";
            await bed.save({ session });
        }

        // 5. Create IPD Admission (IPN)
        const ipn = await generateAdmissionNumber();
        const admission = await IPDAdmission.create([{
            hospitalId,
            branchId,
            patientId: patient._id,
            visitId: visit._id,
            admissionNumber: ipn,
            bedId: sanitizedBedId,
            treatingDoctors: sanitizedTreatingDoctors,
            status: "ADMITTED"
        }], { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            message: "Patient registered and admitted successfully",
            data: {
                patient,
                visit,
                admission: admission[0]
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: error.message });
    }
};
