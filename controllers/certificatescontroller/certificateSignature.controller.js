import CertificateSignature from "../../models/adminandroleandpermissionanagement/certificates/CertificateSignatureSchema.js";
import { createCrudHandlers } from "../_shared/handlerFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: CertificateSignature,
  scope,
});

export const createCertificateSignature = create;
export const getCertificateSignatures = getAll;
export const getCertificateSignatureById = getById;
export const updateCertificateSignature = updateById;
export const deleteCertificateSignature = deleteById;

