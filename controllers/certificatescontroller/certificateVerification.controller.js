import CertificateVerification from "../../models/adminandroleandpermissionanagement/certificates/CertificateVerificationSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: CertificateVerification,
  scope,
});

export const createCertificateVerification = create;
export const getCertificateVerifications = getAll;
export const getCertificateVerificationById = getById;
export const updateCertificateVerification = updateById;
export const deleteCertificateVerification = deleteById;

