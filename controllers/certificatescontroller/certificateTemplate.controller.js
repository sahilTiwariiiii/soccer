import CertificateTemplate from "../../models/adminandroleandpermissionanagement/certificates/CertificateTemplateSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: CertificateTemplate,
  scope,
});

export const createCertificateTemplate = create;
export const getCertificateTemplates = getAll;
export const getCertificateTemplateById = getById;
export const updateCertificateTemplate = updateById;
export const deleteCertificateTemplate = deleteById;

