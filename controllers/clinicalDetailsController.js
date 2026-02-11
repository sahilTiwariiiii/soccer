// import Complaint from "../models/Complaint.js";
import PastMedicalHistory from '../models/PastMedicalHistory.js';
import PastSurgicalHistory from '../models/PastSurgicalHistory.js';
import Addiction from '../models/Addiction.js';


// Addiction

// Create the Addiction 
export const createAddiction=async(req,res)=>{
    const {patientId,type,duration,units,frequency,status,createdByUser} =req.body;
    // created by ex nurse, counter body,doctor
    try {     // what is the meaning of this small user in this req.user._id 
        // const createdByUser= req.user._id;
        const PatientAddiction=await Addiction.create({
            patientId,type,duration,units,frequency,status,createdByUser
        })
        return res.status(201).json({message:"Addiction record created",PatientAddiction});

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// Get all the Addiction list of the Patient 
export const getPatientAddiction=async(req,res)=>{
const {patientId}=req.params;
try {
    const patientAddictionData= await Addiction.find({patientId});
    return res.status(200).json({message:"Get All Addiction Details",patientAddictionData});
} catch (error) {
    return res.status(500).json({message:error.message});
}
}

// update the Addiction
export const updateAddiction=async(req,res)=>{
    const {id}=req.params;
    // const createdByUser=req.user._id;
    const {type,duration,units,frequency,status}=req.body;
    try {        
        const updateAddictionById=await Addiction.updateOne({_id:id},{type,duration,units,frequency,status});
        return res.status(200).json({message:"Updated Sucessfully",...req.body});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}
// there was not need of making the diffrent api for get by id because we direct update on the id itself that it
// Delete by id Addiction
export const deleteById=async(req,res)=>{
    const {id}=req.params;
    try {
        await Addiction.deleteOne({_id:id});
    return res.status(200).json({message:"Addiction Deleted Sucessfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
// Delete all selected Additcion
export const deleteMultiple=async(req,res)=>{
    const {ids}=req.body;
    try {
        await Addiction.deleteMany({_id:{$in:ids}})
        return res.status(200).json({message:"Deleted All Addiction Sucessfully"})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }

}  

// Surgical
// get all  PastSurgicalHistory of Patient
export const PatientPastSurgicalHistory=async(req,res)=>{
    const {patientId}=req.params;
    try {
        const pastPatientSurgicalHistory= await PastSurgicalHistory.find({patientId});
        return res.status(200).json({message:"Patient Past Surgical history Details",pastPatientSurgicalHistory});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
// Create PastSurgicalHistory of Patient
export const createPatientPastSurgicalHistory=async(req,res)=>{
    // const createdByUser=req.user._id;
    const {patientId,surgeryName,surgeryDate,surgeonName,hospital}= req.body;
    if(!patientId){
        return res.status(400).json({message:"Patiend Id is required"})
    }
    if(!surgeryName){
        return res.status(400).json({message:"Surgery Name is required"})
    }
    if(!surgeryDate){
        return res.status(400).json({message:"Surgery Date is required"})
    }
    if(!hospital){
        return res.status(400).json({message:"Hospital is required"})
    }
    
    try {
        const patientSurgicalHistory = await PastSurgicalHistory.create({
            patientId,surgeryName,surgeryDate,surgeonName,hospital,
            // createdByUser
        });
        return res.status(201).json({message:"Surgical History Created"},patientSurgicalHistory);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}
// delete by id past surgical history
export const deleteSurgicalHistoryById=async(req,res)=>{
const {id}=req.params;
try {
    await PastSurgicalHistory.deleteOne({_id:id});
    return res.status(200).json({message:"Deleted Sucessfully"});
} catch (error) {
    return res.status(500).json({message:error.message});
}
}
// delete multiple
export const deleteMultipleSurgicalHistory=async(req,res)=>{
    const {ids}=req.body;
    try {
        await PastSurgicalHistory.deleteMany({_id:{$in:ids}});
        return res.status(200).json({message:"Deleted Sucessfully"});
    } catch (error) {
        return res.status(200).json({message:error.message});
    }
}
// update surgical history
export const updateSurgicalHistory=async(req,res)=>{
    const {id}=req.params;
    const {surgeryName,surgeryDate,surgeonName,hospital}=req.body;
    try {
        const updatedsurgicalhistory= await PastSurgicalHistory.updateOne({_id:id},{surgeryName,surgeryDate,surgeonName,hospital});
        return res.status(200).json({message:"Updated Surgical Details",updatedsurgicalhistory});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

// Medical History

// get PastMedicalHistory of Patient
export const PatientPastMedicalHistory=async(req,res)=>{
    const {patientId}=req.params;
    try {
        const pastPatientMedicalHistory= await PastMedicalHistory.find({patientId});
        return res.status(200).json({message:"Patient Past Medical history Details",pastPatientMedicalHistory});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
// create createPatientPastSurgicalHistory of Patient
export const createPatientPastMedicalHistory=async(req,res)=>{
    const {patientId,disease,duration,medication}=req.body;
    // const createdByUser=req.user._id;
   try {
    const createdmedicalhistory=await PastMedicalHistory.create({patientId,disease,duration,medication,
        // createdByUser
    })
    return res.status(201).json({message:"Patient Past Medical History created",createdmedicalhistory});
   } catch (error) {
    return res.status(500).json({message:error.message})
   }

}
export const updatePatientPastMedicalHistory=async(req,res)=>{
    const {id}=req.params;
    const {disease,duration,medication}=req.body;
   try {
    const updatedmedicalhistory=await PastMedicalHistory.updateOne({_id:id},{disease,duration,medication,
        // createdByUser
    })
    return res.status(201).json({message:"Updated Past Medical History created",updatedmedicalhistory});
   } catch (error) {
    return res.status(500).json({message:error.message})
   }

}
export const deletePatientPastMedicalHistoryById=async(req,res)=>{
    const {id}=req.params;
   try {
    await PastMedicalHistory.deleteOne({_id:id})
    return res.status(201).json({message:"Deleted Sucessfully"});
   } catch (error) {
    return res.status(500).json({message:error.message})
   }

}
export const deleteMultiplePatientPastMedicalHistory=async(req,res)=>{
    const {ids}=req.body;
   try {
    await PastMedicalHistory.deleteMany({_id:{$in:ids}})
    return res.status(201).json({message:"All Deleted Sucessfully"});
   } catch (error) {
    return res.status(500).json({message:error.message})
   }

}

// Complaint
// Create Complaint
export const createComplaint = async (req, res) => {
    const { visitId, complaints } = req.body;
  
    // IMPORTANT FOR CREATE
    if (!visitId)
      return res.status(400).json({ message: "visitId required" });
  
    if (!complaints || complaints.length === 0)
      return res.status(400).json({ message: "complaints required" });
  
    try {
      const complaint = await Complaint.create({
        visitId,
        complaints,
        // createdByUser: req.user._id,
      });
  
      res.status(201).json(complaint);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
// Update Compplaint
export const updateComplaint = async (req, res) => {
    const { id } = req.params;
    const { complaints } = req.body;
  
    // IMPORTANT VALIDATION
    if (!id)
      return res.status(400).json({ message: "id required" });
  
    if (!complaints || complaints.length === 0)
      return res
        .status(400)
        .json({ message: "complaints required" });
  
    try {
      const result = await Complaint.updateOne(
        { _id: id },
        { complaints }
      );
  
      if (result.matchedCount === 0)
        return res.status(404).json({ message: "Complaint not found" });
  
      res.json({ message: "Complaint updated successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
// Delete Complaint
export const deleteComplaint = async (req, res) => {
    const { id } = req.params;
  
    if (!id)
      return res.status(400).json({ message: "id required" });
  
    try {
      await Complaint.deleteOne({ _id: id });
  
      res.json({ message: "Complaint deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  



 
//   getAllAddictionHistory
export default {createAddiction,updateAddiction,deleteById,deleteMultiple,createPatientPastSurgicalHistory,PatientPastSurgicalHistory,updateSurgicalHistory,getPatientAddiction,PatientPastMedicalHistory,createPatientPastMedicalHistory,updatePatientPastMedicalHistory,deletePatientPastMedicalHistoryById,deleteMultiplePatientPastMedicalHistory};