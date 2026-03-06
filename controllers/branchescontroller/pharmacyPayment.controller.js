import PharmacyPayment from "../../models/branches/PharmacyPayment.js";

export const createPharmacyPayment = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const doc = await PharmacyPayment.create({
      ...req.body,
      hospitalId,
      branchId,
    });

    return res.status(201).json({ message: "Pharmacy payment created successfully", data: doc });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPharmacyPayments = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const { invoiceId, paymentMode, fromDate, toDate, page = 1, limit = 10 } = req.query;

    const filter = { hospitalId, branchId };
    if (invoiceId) filter.invoiceId = invoiceId;
    if (paymentMode) filter.paymentMode = paymentMode;
    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    const docs = await PharmacyPayment.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await PharmacyPayment.countDocuments(filter);

    return res.status(200).json({ total, page: Number(page), limit: Number(limit), data: docs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPharmacyPaymentById = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const doc = await PharmacyPayment.findOne({ _id: req.params.id, hospitalId, branchId });
    if (!doc) return res.status(404).json({ message: "Pharmacy payment not found" });

    return res.status(200).json(doc);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePharmacyPayment = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const updated = await PharmacyPayment.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Pharmacy payment not found" });

    return res.status(200).json({ message: "Pharmacy payment updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePharmacyPayment = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user || {};
    if (!hospitalId || !branchId) {
      return res.status(401).json({ message: "Unauthorized: hospitalId/branchId missing in token" });
    }

    const deleted = await PharmacyPayment.findOneAndDelete({ _id: req.params.id, hospitalId, branchId });
    if (!deleted) return res.status(404).json({ message: "Pharmacy payment not found" });

    return res.status(200).json({ message: "Pharmacy payment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

