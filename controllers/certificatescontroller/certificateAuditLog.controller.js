import CertificateAuditLog from "../../models/adminandroleandpermissionanagement/certificates/CertificateAuditLogSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: CertificateAuditLog,
  scope,
});

export const createCertificateAuditLog = create;
export const getCertificateAuditLogs = getAll;
export const getCertificateAuditLogById = getById;
export const updateCertificateAuditLog = updateById;
export const deleteCertificateAuditLog = deleteById;

