import PatientVisit from "../models/PatientVisitSchema.js";
import PatientRegistration from "../models/PatientRegistration.js";
import PatientReceipt from "../models/PatientReceipt.js";
import Room from "../models/branches/RoomSchema.js";
import OpdToken from "../models/opd/OpdToken.js";
import { generateUniqueReceiptNumber } from "../services/generateuniquereceiptid.js";

export const createPatientVisit = async (req, res) => {
  try {
    const { 
      patientId,
      visitDate,
      visitTime,
      visitType,
      fee,
      departmentId,
      departmentName,
      doctorId,
      roomId,
      slot,
      paymentMode,
      discountPercent,
      remark
    } = req.body;

    const { hospitalId, branchId, _id: userId } = req.user;

    // 1. Validate patient exists
    const patient = await PatientRegistration.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // 2. Generate a unique receipt number
    const receiptNo = await generateUniqueReceiptNumber();

    // 3. Create the patient visit
    const patientVisit = await PatientVisit.create({
      patientId,
      uhid: patient.uhid,
      hospitalId,
      branchId,
      visitDate,
      visitTime,
      visitType,
      departmentId,
      departmentName,
      doctorId,
      roomId,
      slot,
      fee,
      paymentMode,
      receiptNo
    });

    // 4. Create the receipt
    await PatientReceipt.create({
      receiptNumber: receiptNo,
      patientId,
      uhid: patient.uhid,
      visitId: patientVisit._id,
      departmentId,
      doctorId,
      paymentMode,
      discountPercent,
      fee,
      remark,
      createdBy: userId
    });

    // 5. Generate OPD Token if applicable
    let tokenInfo = null;
    if (visitType === "OPD" && roomId) {
      const room = await Room.findById(roomId);
      if (room) {
        const date = new Date();
        const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        const count = await OpdToken.countDocuments({ roomId, tokenDate: { $gte: start, $lt: end } });
        const tokenNumber = count + 1;
        tokenInfo = await OpdToken.create({
          hospitalId: room.hospitalId,
          branchId: room.branchId,
          roomId,
          doctorId: doctorId || room.assignedDoctor,
          patientId,
          visitId: patientVisit._id,
          tokenDate: date,
          tokenNumber,
          priority: req.body.priority || "Normal"
        });
      }
    }

    return res.status(201).json({ message: "Patient visit created successfully", visit: patientVisit, token: tokenInfo });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};