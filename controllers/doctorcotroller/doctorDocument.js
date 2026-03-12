import { DoctorDocument } from "../../models/DoctorDocument.js";

// 1️⃣ Create
export const createDoctorDocument = async (req, res) => {
  try {
    const data = await DoctorDocument.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2️ Get All (Hospital Wise)
// Matlab: Sab doctors ke documents lana (usually hospital ke andar).
export const getAllDoctorDocuments = async (req, res) => {
  try {
    const { hospitalId } = req.query;

    const filter = hospitalId ? { hospitalId } : {};

    const data = await DoctorDocument.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️ Get By Doctor
//: Sirf ek particular doctor ke documents lana.
export const getByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const data = await DoctorDocument.findOne({ doctorId });

    if (!data) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4️ Get By ID
// Matlab: DoctorDocument collection ka ek specific record lana uske document record ID se.
export const getById = async (req, res) => {
  try {
    const data = await DoctorDocument.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5️ Add Document (Push in Array)
export const addDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await DoctorDocument.findByIdAndUpdate(
      id,
      {
        $push: {
          documents: {
            documentType: req.body.documentType,
            fileUrl: req.body.fileUrl,
            uploadedAt: new Date()
          }
        }
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6️ Update Digital Signature
export const updateDigitalSignature = async (req, res) => {
  try {
    const updated = await DoctorDocument.findByIdAndUpdate(
      req.params.id,
      { digitalSignatureUrl: req.body.digitalSignatureUrl },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7️ Delete Single Document from Array
export const deleteSingleDocument = async (req, res) => {
  try {
    const { id, documentId } = req.params;

    const updated = await DoctorDocument.findByIdAndUpdate(
      id,
      {
        $pull: {
          documents: { _id: documentId }
        }
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 8️ Delete Complete Record
export const deleteDoctorDocument = async (req, res) => {
  try {
    await DoctorDocument.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};