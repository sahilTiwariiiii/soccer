import CertificateType from "../../models/adminandroleandpermissionanagement/certificates/CertificateTypeSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: CertificateType,
  scope,
});

export const createCertificateType = create;
export const getCertificateTypes = getAll;
export const getCertificateTypeById = getById;
export const updateCertificateType = updateById;
export const deleteCertificateType = deleteById;

