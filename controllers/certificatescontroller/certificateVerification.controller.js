import CertificateVerification from "../../models/adminandroleandpermissionanagement/certificates/CertificateVerificationSchema.js";
import GeneratedCertificate from "../../models/adminandroleandpermissionanagement/certificates/GeneratedCertificateSchema.js";
import { createCrudHandlers } from "../_shared/handlerFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: CertificateVerification,
  scope,
});

export const verifyCertificate = async (req, res) => {
  try {
    const { certificateNumber } = req.body;
    const hospitalId = req.user.hospitalId;
    const branchId = req.user.branchId;

    const certificate = await GeneratedCertificate.findOne({
      certificateNumber,
      hospitalId,
      branchId
    }).populate("patientId doctorId templateId");

    if (!certificate) {
      return res.status(404).json({
        success: false,
        status: "invalid",
        message: "Certificate not found"
      });
    }

    // Create verification log
    await CertificateVerification.create({
      hospitalId,
      branchId,
      certificateNumber,
      status: "valid",
      verificationTimestamp: new Date(),
      ipAddress: req.ip,
      location: "System Portal"
    });

    res.status(200).json({
      success: true,
      status: "valid",
      certificate
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCertificateVerification = create;
export const getCertificateVerifications = getAll;
export const getCertificateVerificationById = getById;
export const updateCertificateVerification = updateById;
export const deleteCertificateVerification = deleteById;

