import mongoose from "mongoose";
import PatientRegistration from "../models/PatientRegistration.js";
import PatientVisit from "../models/PatientVisitSchema.js";
import PatientReceipt from "../models/PatientReceipt.js";
import { generatepatientuhid } from "../services/generatepatientuhid.js";
import { generateUniqueReceiptNumber } from "../services/generateuniquereceiptid.js";

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
       
        // check that the uhid is alrady present in the 
        // yaha pe koi autometic regestratin nahi hoga jaisa agar ex agar doctor bolta hai koi test toh fir paitent dobara ayega aur dusare jagha jab vo patietnt kahega ki ye test karvana hai tab hum uske liye automatic karenge taki vo pathology department me apne aapp chale jye request aur fir jab patient jyega toh consult kar lega koi 'Transaction Process nahi hogi simple registration agar opd me jana hai toh vo agar ipd me jana hai toh vo aur agar dusari bar ayr ho toh vo that it nothing else complex'

        // if we get the uhid then
      
       
        if (uhid) {
            const patient = await PatientRegistration.findOne({ uhid });
          
            
            if (patient) {
                // generate unique receipt number of id
                const generate_receipt_no=await generateUniqueReceiptNumber();
                // now when user exists  then just make the entry in the 'PatientVisit' Schema
            const patientVisited=await PatientVisit.create({
                    patientId: patient._id,
                    uhid: patient.uhid,
                    departmentId,
                    departmentName,
                    visitDate,
                    visitTime,
                    visitType,
                    // dont pass any status because we will get the status will be budefault set as 'arrived'
                    // status,
                    doctorId,
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
                return res.status(201).json({ message: "Patient Visit Sucessfully" });
            }
        }
        // if not find any uhid then create it
        const uhid_generate =await generatepatientuhid();
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
            departmentId,
            departmentName,
            visitDate,
            visitTime,
            visitType,
            // dont pass any status because we will get the status will be budefault set as 'arrived'
            // status,
            doctorId,
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

        return res.status(201).json({message:"User registered and Visited Sucessfully"});
        
    } catch (error) {
      return res.status(500).json({message:error.message});
    }
}