import CertificateField from "../../models/adminandroleandpermissionanagement/certificates/CertificateFieldSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: CertificateField,
  scope,
});

export const createCertificateField = create;
export const getCertificateFields = getAll;
export const getCertificateFieldById = getById;
export const updateCertificateField = updateById;
export const deleteCertificateField = deleteById;

