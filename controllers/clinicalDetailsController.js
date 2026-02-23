// import Complaint from "../models/Complaint.js";
import PastMedicalHistory from '../models/PastMedicalHistory.js';
import PastSurgicalHistory from '../models/PastSurgicalHistory.js';
import Addiction from '../models/Addiction.js';
import PersonalHistory from '../models/PersonalHistory.js';
import Diagnosis from '../models/Diagnosis.js';
import PatientRegistration from '../models/PatientRegistration.js';
import PatientVisit from '../models/PatientVisitSchema.js';
import DoctorNotes from '../models/DoctorNotes.js'
import User from '../models/User.js'
import CurrentTreatment from '../models/CurrentTreatment.js';

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
    const patientAddictionData= await Addiction.find({patientId}).sort({createdAt:-1});
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
        const updateAddictionById=await Addiction.findByIdAndUpdate(id,{type,duration,units,frequency,status});
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
        const pastPatientSurgicalHistory= await PastSurgicalHistory.find({patientId}).sort({createdAt:-1});
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
        return res.status(400).json({message:"Patient Id is required"})
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
        const updatedsurgicalhistory= await PastSurgicalHistory.findByIdAndUpdate(id,{surgeryName,surgeryDate,surgeonName,hospital},{new:true});
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
    const updatedmedicalhistory=await PastMedicalHistory.findByIdAndUpdate(id,{disease,duration,medication,
        // createdByUser,
    },
{new:true})
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
      const result = await Complaint.findByIdAndUpdate(
       id,
        { complaints },{new:true}
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
  
//  Personal History 

// Create Personal History
export const createPersonalHistory = async (req, res) => {
    try {
      const {
        visitId,
        diet,
        appetite,
        sleep,
        bladder,
        bowel,
        currentTreatment,
        comments,
        createdByUser
      } = req.body;
  
      const history = await PersonalHistory.create({
        visitId,
        diet,
        appetite,
        sleep,
        bladder,
        bowel,
        currentTreatment,
        comments,
        createdByUser
      });
  
      res.status(201).json({
        success: true,
        message: "Personal history created successfully",
        data: history
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating personal history",
        error: error.message
      });
    }
  };
  
// Update Personal History
export const updatePersonalHistory = async (req, res) => {
    try {
      const {
        visitId,
        diet,
        appetite,
        sleep,
        bladder,
        bowel,
        currentTreatment,
        comments,
      } = req.body;
  
      const updatedHistory = await PersonalHistory.findByIdAndUpdate(
        req.params.id,
        {
          visitId,
          diet,
          appetite,
          sleep,
          bladder,
          bowel,
          currentTreatment,
          comments,
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedHistory) {
        return res.status(404).json({
          success: false,
          message: "Personal history not found"
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Personal history updated successfully",
        data: updatedHistory
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating personal history",
        error: error.message
      });
    }
  };
// get all Personal History by Patient Id
export const getPersonalHistoryByPatientId = async (req, res) => {
    try {
      const histories = await PersonalHistory.find()
        .populate({
          path: "visitId",
          match: { patientId: req.params.patientId }
        })
        .populate("createdByUser").sort({createdAt:-1});
  
      const filtered = histories.filter(h => h.visitId !== null);
  
      res.status(200).json({
        success: true,
        total: filtered.length,
        data: filtered
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching personal history",
        error: error.message
      });
    }
  };
// delete Pesonal History by Id
export const deletePersonalHistoryByVisitId = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedHistory = await PersonalHistory.findOneAndDelete({ _id:id });
  
      if (!deletedHistory) {
        return res.status(404).json({
          success: false,
          message: "Personal history not found"
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Personal history deleted successfully"
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting personal history",
        error: error.message
      });
    }
  };
// delete multiple ids
export const deleteMultiplePersonalHistory = async (req, res) => {
  try {
    const { ids } = req.body;

    // Check if ids exist and is array
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid PersonalHistory IDs"
      });
    }

    const result = await PersonalHistory.deleteMany({
      _id: { $in: ids }
    });

    res.status(200).json({
      success: true,
      message: "Selected personal history records deleted successfully",
      deletedCount: result.deletedCount
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting personal history",
      error: error.message
    });
  }
};

// Diagnosis
// Create 
export const createDiagnosis=async(req,res)=>{
  const {visitId,patientId,diagnosisType,diagnosisName,icdCode,notes}=req.body;
 
  if(!visitId){
    return res.status(400).json({message:"Visit Id is required"});
  }
  if(!diagnosisType){
    return res.status(400).json({message:"Diagnosis Type is required"});
  }
  if(!diagnosisName){
    return res.status(400).json({message:"Diagnosis Name is required"});
  }
 
  if(!notes){
    return res.status(400).json({message:"Notes is required"});
  }
  try {
    
    const isvisitIdExist= await PatientVisit.findById(visitId);
    const isPatientExist= await PatientRegistration.findById(patientId);
    if(!isvisitIdExist){
      return res.status(401).json({message:"Invalid Visit Id"});
    }
  
   if(!isPatientExist){
      return res.status(401).json({message:"Patient Id invalid"});
    }
    //🔥🔥 step to implement -> ek din me ek patient ek hi diagnose banva sakta hai 
  const creatediagnosis=await Diagnosis.create({
  visitId,
  patientId,
  diagnosisType,
  diagnosisName,
  icdCode,
  notes
    })
    return res.status(201).json({message:"Diagnosis Created required"},creatediagnosis);
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}
// Update
export const updateDiagnosis=async(req,res)=>{
  const {id}=req.params;
  const {visitId,diagnosisType,diagnosisName,icdCode,notes}=req.body;
  try {
    const updatediagnosis=await Diagnosis.findByIdAndUpdate(id,{diagnosisType,diagnosisName,icdCode,notes},{new:true});
    return res.status(201).json({message:"Diagnosis Updated Sucessfully",data:updatediagnosis});
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}
// Get Diagnosis by id
export const getDiagnosisById=async(req,res)=>{
  try {
    const {id}=req.params;
    const getdiagnosis=await Diagnosis.findById(id);
    return res.status(200).json({message:"Get Sucessfully",data:getdiagnosis});
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}
// Get all Diagnosis by Patient Id ->  only doctor will able to see this 
export const getDiagnosisByPatientId=async(req,res)=>{
  const {patientId}=req.params;
  try {
    const isexist=await PatientRegistration.find({patientId});
    if(!isexist){
      return res.status(401).json({message:"Invalid Patient Id"});
    }
    const getpatientdiagnosis=await Diagnosis.find({patientId}).populate("patientId").sort({createdAt:-1});
    return res.status(200).json({message:"Patient All Diagnosis retrived Sucessfully",data:getpatientdiagnosis});
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}
// get diagnosis by visit id
export const getDiagnosisVisitId=async(req,res)=>{
  const {visitId}=req.params;

  try {
    const isvisitidexist=await PatientVisit.findById(visitId);
    if(!isvisitidexist){
      return res.status(401).json({message:"Invalid Visit Exists"})
    }
    const getdiagnosis=await Diagnosis.find({visitId}).populate("visitId");
    return res.status(200).json({message:"Retrived Visit Diagnosis Sucessfully",data:getdiagnosis});
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}

// Doctor Notes
// Create
export const createDoctorNotes=async(req,res)=>{
  // We Get the User Id from the token
  const {visitId,subjective,objective,assessment,plan}=req.body;
  if (!visitId || !subjective || !objective || !assessment || !plan) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userId=req.user.id;
  try {
    // check visit id existing or not
    const isVisited=await PatientVisit.findOne({_id:visitId});
    if(!isVisited){
      return res.status(404).json({message:"Invalid visit Id"});
    }
    // Only Doctor will be able to create the Doctor Notes if the role was 
    const isDoctor=await User.findOne({_id:userId});
    if(!isDoctor){
      return res.status(404).json({message:"User not found"})
    }
    if(isDoctor.role!=="doctor"){
      return res.status(403).json({message:`Hello ${isDoctor.role} ${isDoctor.name} ,Insufficient Permission,Only Doctor can create Doctor Notes`});
    }
    // check that One Doctor can create One note for that visit means one day one patient can consult more that one doctor multiples not one doctor can create notes for one time only for that patient visit after that they will be able to update that
    const isexistingNotes=await DoctorNotes.findOne({visitId,userId});
    // ✅ If only the visitId matches but the userId does not match → the document will not be found.

// ✅ If only the userId matches but the visitId does not match → the document will not be found.
    if(isexistingNotes){
      return res.status(409).json({message:"Dr. you already Created the Notes for this Patient"})
    }
    // take out the userId form the schema only
    await DoctorNotes.create({visitId,userId,subjective,objective,assessment,plan});
    return res.status(201).json({message:"Doctor Notes Created Sucessfully"});
  } catch (error) {
    return res.status(500).json({mesage:error.message});
  }
}
// Update
export const updateDoctorNotes=async(req,res)=>{
  const {id}=req.params;
  if(!id){
    return res.status(400).json({message:"Id is required"});
  }
  const {subjective,objective,assessment,plan}=req.body;

  if(!subjective && objective &&assessment&&plan){
    return res.status(400).json({mesage:"At least One field are required to update"})
  }
try {

  const userId=req.user.id;
  // only Doctor can update Doctor notes
    const isDoctor=await User.findOne({_id:userId});
    if(!isDoctor){
      return res.status(404).json({message:"User not found"})
    }
    if(isDoctor.role!=="doctor"){
      return res.status(403).json({message:`Hello ${isDoctor.role} ${isDoctor.name} ,Insufficient Permission,Only Doctor can create Doctor Notes`});
    }
  // Check that visit Id exist or not
  const isId= await DoctorNotes.findOne({_id:id});
  if(!isId){
    return res.status(404).json({message:"Visit Id does not exists!"});
  }
  // find visit and update
  await DoctorNotes.findByIdAndUpdate({_id:id},{subjective,objective,assessment,plan,},{new:true});
  return res.status(201).json({message:"Update Sucessfully"})
} catch (error) {
  return res.status(500).json({message:error.message})
}
}

// Doctor Notes
export const getDoctorNotesById=async(req,res)=>{
  try {
    const {id}=req.params;
    if(!id){
      return res.status(400).json({message:"Id is required"})
    }
    const getdata=await DoctorNotes.findOne({_id:id});
    if(!getdata){
      return res.staus(400).json({message:"Not exists "})
    }
    return res.status(200).json({message:"Retrived Data sucessfully",getdata});
    
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

// Delete Notes
export const deleteDoctorNotes=async(req,res)=>{
  const {id}=req.params;
  const user=req.user.id;
try {
  const isVisit=await DoctorNotes.findOne({_id:id});
  if(!isVisit){
    return res.status(404).json({message:"Visit Id not exists"})
  }
  await DoctorNotes.findByIdAndDelete(id);
  return res.status(200).json({message:"Deleted Sucessfully"});
} catch (error) {
  return res.status(500).json({message:error.message})
}
}

// CurrentTreatment (Prescription)
// Create 
export const createCurrentTeatmentPrecription=async(req,res)=>{
  const {visitId}=req.params;
  const userId=req.user.id;
  const {medicines,pharmacyNotes,refills}=req.body;
  if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
    return res.status(400).json({ message: "At least one medicine is required" });
  }
  try {
    // only doctor will be able to create the precreption
     // check visit id existing or not
     const isVisited=await PatientVisit.findOne({_id:visitId});
     if(!isVisited){
       return res.status(404).json({message:"Invalid visit Id"});
     }
     // Only Doctor will be able to create the Doctor Notes if the role was 
     const isDoctor=await User.findOne({_id:userId});
     if(!isDoctor){
       return res.status(404).json({message:"User not found"})
     }
     if(isDoctor.role!=="doctor"){
       return res.status(403).json({message:`Hello ${isDoctor.role} ${isDoctor.name} ,Insufficient Permission,Only Doctor can create Doctor Notes`});
     }
    //  Prevent the Duplicate Precreption
    const existing=await CurrentTreatment.findOne({visitId});
    if(existing){
   return res.status(409).json({message:"Precreption already created for this visit"});
    }
    //  now create the Precription
 
 const createdPrecription=await CurrentTreatment.create({
  visitId,
  doctorId:userId,
  patientId:isVisited.patientId,
  medicines,pharmacyNotes,refills
 })
 return res.status(201).json({message:"Precription Created Sucesfully",createdPrecription})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}
// Update
export const updateCurrentTeratmentPrecription=async(req,res)=>{
  const {medicines,pharmacyNotes,refills}=req.body;
  if(!medicines && !pharmacyNotes && !refills){
    return res.status(400).json({message:"At least field is required to update"});
  }

  try {
    const userId=req.user.id;
    // check document id
    const {id}=req.params;
    // is the 'id' visit in our db
    const isId=await CurrentTreatment.findOne({_id:id});
    if(!isId){
      return res.status(404).json({message:"Document Id not exist!"})
    }
    // Only Doctor will do update
    const isDoctor=await User.findOne({_id:userId});
    if(isDoctor.role!=="doctor"){
      return res.status(404).json({message:`Hi ${isDoctor.role}, ${isDoctor.name}, Permission Denied, Only Doctor can update`});
    }
    // Update Object Dynamically
    const updateData={};
    if (medicines) updateData.medicines=medicines;
    if (pharmacyNotes) updateData.medicinespharmacyNotes=pharmacyNotes;
    if (refills) updateData.refills=refills;
    const updated_data=await CurrentTreatment.findByIdAndUpdate({_id:id},{updatedDate},{new:true});
    return res.status(201).json({message:"Updated Sucessfully",updated_data});
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}

//   getAllAddictionHistory



export default {createAddiction,updateAddiction,deleteById,deleteMultiple,createPatientPastSurgicalHistory,PatientPastSurgicalHistory,updateSurgicalHistory,getPatientAddiction,PatientPastMedicalHistory,createPatientPastMedicalHistory,updatePatientPastMedicalHistory,deletePatientPastMedicalHistoryById,deleteMultiplePatientPastMedicalHistory,createPersonalHistory,
    updatePersonalHistory,
    getPersonalHistoryByPatientId,
    deletePersonalHistoryByVisitId,
    deleteMultiplePersonalHistory,createDiagnosis,
    updateDiagnosis,
    getDiagnosisById,
    getDiagnosisByPatientId,
    getDiagnosisVisitId,createDoctorNotes,updateDoctorNotes,getDoctorNotesById,deleteDoctorNotes,createCurrentTeatmentPrecription,updateCurrentTeratmentPrecription};