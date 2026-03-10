import mongoose from "mongoose";
import PatientRegistration from "../models/PatientRegistration.js";
import PatientVisit from "../models/PatientVisitSchema.js";
import PatientReceipt from "../models/PatientReceipt.js";
import Room from "../models/branches/RoomSchema.js";
import OpdToken from "../models/opd/OpdToken.js";
import User from "../models/User.js";
import { generatepatientuhid } from "../services/generatepatientuhid.js";
import { generateUniqueReceiptNumber } from "../services/generateuniquereceiptid.js";

const createVisitForPatient = async (patient, req, res, hospitalId, branchId, departmentId, departmentName, visitDate, visitTime, visitType, doctorId, roomId, slot, fee, paymentMode, discountPercent, remark) => {
    // generate unique receipt number of id
    const generate_receipt_no = await generateUniqueReceiptNumber();
    // now when user exists  then just make the entry in the 'PatientVisit' Schema
    const patientVisited = await PatientVisit.create({
        patientId: patient._id,
        uhid: patient.uhid,
        hospitalId,
        branchId,
        departmentId,
        departmentName,
        visitDate,
        visitTime,
        visitType,
        doctorId,
        roomId,
        slot,
        fee,
        paymentMode,
        receiptNo: generate_receipt_no
    })
    // save the receipt detials into receipt model
    await PatientReceipt.create({
        receiptNumber: generate_receipt_no,
        patientId: patientVisited.patientId,
        uhid: patientVisited.uhid,
        visitId: patientVisited._id,
        departmentId,
        doctorId,
        paymentMode,
        discountPercent,
        fee,
        remark,
    })

    // Generate Token if Visit Type is OPD
    let tokenInfo = null;
    if (visitType === "OPD") {
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
                patientId: patient._id,
                visitId: patientVisited._id,
                tokenDate: date,
                tokenNumber,
                priority: req.body.priority || "Normal"
            });
        }
    }

    return res.status(201).json({ message: "Patient Visit Successfully", token: tokenInfo });
}

export const PatientRegisterController = async (req, res) => {
    const { uhid,visitDate,
        visitTime,
        visitType,
        fee,
        mobile,
        email,
        departmentId,
        departmentName,
        doctorId,
        roomId,
        slot,
        patientName,
        gender,
        maritalStatus,
        dob,
        age,
        currentAge,
        relationType,
        guardianName,
        address,
        country,
        stateId,
        cityId,
        bloodGroup,
        source,

        referredDoctorId,
        referralMobile,
        paymentMode,
        discountPercent,
        remark,
        patientImage } = req.body;
 // validation
 if (!visitDate) {
    return res.status(400).json({ message: "Visit Date is required" })
}
if (!visitTime) {
    return res.status(400).json({ message: "Visit Time is required" })
}
if (!visitType) {
    return res.status(400).json({ message: "Visit Type is required" })
}
if (visitType === "OPD" && !roomId) {
    return res.status(400).json({ message: "Room Id is required for OPD visit" })
}
if (fee===undefined||fee===null) {
    return res.status(400).json({ message: "Fee is required" })
}
if (!mobile) {
    return res.status(400).json({ message: "Mobile is required" })
}
//  department id aur docket id ko mandatory nahi kiya kyuki agar mujhe bas xray karan ahai toh fir fir doctor ka koi role nahi 

if (!slot) {
    return res.status(400).json({ message: "Slot is required" })
}
if (!patientName) {
    return res.status(400).json({ message: "Patient Name is required" })
}
if (!gender) {
    return res.status(400).json({ message: "Gender is required" })
}
 
if (!dob) {
    return res.status(400).json({ message: "Date of Birth is required" })
}  
if (age===undefined||age===null) {
    return res.status(400).json({ message: "Age is required" })
}
if (!country) {
    return res.status(400).json({ message: "Country is required" })
}
if (!stateId) {
    return res.status(400).json({ message: "State is required" })
}
if (!cityId) {
    return res.status(400).json({ message: "City is required" })
}

if (!paymentMode) {
    return res.status(400).json({ message: "Payment Mode is required" })
}
    try {
        const userId = req.user.id || req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { hospitalId, branchId } = user;

        if (!hospitalId || !branchId) {
            return res.status(400).json({ message: "User is not associated with a hospital or branch." });
        }
       
        // check that the uhid is alrady present in the 
        // yaha pe koi autometic regestratin nahi hoga jaisa agar ex agar doctor bolta hai koi test toh fir paitent dobara ayega aur dusare jagha jab vo patietnt kahega ki ye test karvana hai tab hum uske liye automatic karenge taki vo pathology department me apne aapp chale jye request aur fir jab patient jyega toh consult kar lega koi 'Transaction Process nahi hogi simple registration agar opd me jana hai toh vo agar ipd me jana hai toh vo aur agar dusari bar ayr ho toh vo that it nothing else complex'

        // if we get the uhid then
      
       
        if (uhid) {
            const patient = await PatientRegistration.findOne({ uhid });
            if (patient) {
                return createVisitForPatient(patient, req, res, hospitalId, branchId, departmentId, departmentName, visitDate, visitTime, visitType, doctorId, roomId, slot, fee, paymentMode, discountPercent, remark);
            }
        }

        // Check for existing patient by mobile to prevent duplication
        const existingPatient = await PatientRegistration.findOne({ mobile });
        if (existingPatient) {
            return createVisitForPatient(existingPatient, req, res, hospitalId, branchId, departmentId, departmentName, visitDate, visitTime, visitType, doctorId, roomId, slot, fee, paymentMode, discountPercent, remark);
        }

        // if not find any uhid then create it
        const uhid_generate = await generatepatientuhid();
        // now the user was registered in our hospital now we also make the entry it on the Patient Visit Schema
        const newPatient=await PatientRegistration.create({
            uhid: uhid_generate,
            mobile,
            email,
            patientName,
            gender,
            maritalStatus,
            dob,
            age,
            currentAge,
            relationType,
            guardianName,
            address,
            country,
            stateId,
            cityId,
            bloodGroup,
            source,
            referredDoctorId,
            referralMobile,
            discountPercent,
            remark,
            patientImage,
            departmentId,
            departmentName,
        })
        // generate the receipt number
        const generate_receipt_no=await generateUniqueReceiptNumber();
        
       const patientVisited= await PatientVisit.create({
            patientId:newPatient._id,
            uhid:newPatient.uhid,
            hospitalId,
            branchId,
            departmentId,
            departmentName,
            visitDate,
            visitTime,
            visitType,
            // dont pass any status because we will get the status will be budefault set as 'arrived'
            // status,
            doctorId,
            roomId,
            slot,
            fee,
            paymentMode,
            receiptNo:generate_receipt_no
        })
        // save the receipt detials into receipt model
        await PatientReceipt.create({
receiptNumber:generate_receipt_no,
patientId:patientVisited.patientId,
uhid:patientVisited.uhid,
visitId:patientVisited._id,
departmentId,
doctorId,
paymentMode,
discountPercent,
fee,
remark,
        })

        // Generate Token if Visit Type is OPD
        let tokenInfo = null;
        if (visitType === "OPD") {
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
                    patientId: newPatient._id,
                    visitId: patientVisited._id,
                    tokenDate: date,
                    tokenNumber,
                    priority: req.body.priority || "Normal"
                });
            }
        }

        return res.status(201).json({message:"User registered and Visited Sucessfully", token: tokenInfo});
        
    } catch (error) {
      return res.status(500).json({message:error.message});
    }
}