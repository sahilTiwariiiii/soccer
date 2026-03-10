import Receipt from "../../models/PatientReceipt.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: Receipt,
  scope: [],
});

export const createReceipt = create;
export const getReceipts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const docs = await Receipt.find()
      .populate("patientId", "patientName uhid age gender")
      .populate("doctorId", "name")
      .populate("departmentId", "name")
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Receipt.countDocuments();

    return res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: docs,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getReceiptById = getById;
export const updateReceipt = updateById;
export const deleteReceipt = deleteById;

