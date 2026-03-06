import GeneratedCertificate from "../../models/adminandroleandpermissionanagement/certificates/GeneratedCertificateSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: GeneratedCertificate,
  scope,
});

export const createGeneratedCertificate = create;
export const getGeneratedCertificates = getAll;
export const getGeneratedCertificateById = getById;
export const updateGeneratedCertificate = updateById;
export const deleteGeneratedCertificate = deleteById;

