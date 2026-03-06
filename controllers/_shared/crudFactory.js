export function buildScopeFilter(req, scope = []) {
  if (!scope || scope.length === 0) return {};

  const user = req.user || {};
  const filter = {};

  for (const rule of scope) {
    const tokenValue = user[rule.tokenKey];
    if (!tokenValue) {
      const msg = `Unauthorized: ${rule.tokenKey} missing in token`;
      const err = new Error(msg);
      err.statusCode = 401;
      throw err;
    }
    filter[rule.modelField] = tokenValue;
  }

  return filter;
}

export function createCrudHandlers({ Model, scope = [] }) {
  if (!Model) throw new Error("Model is required");

  const create = async (req, res) => {
    try {
      const scopeFilter = buildScopeFilter(req, scope);
      const doc = await Model.create({ ...req.body, ...scopeFilter });
      return res.status(201).json({ message: "Created successfully", data: doc });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  };

  const getAll = async (req, res) => {
    try {
      const scopeFilter = buildScopeFilter(req, scope);
      const { page = 1, limit = 20 } = req.query;

      const docs = await Model.find(scopeFilter)
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      const total = await Model.countDocuments(scopeFilter);

      return res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        data: docs,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  };

  const getById = async (req, res) => {
    try {
      const scopeFilter = buildScopeFilter(req, scope);
      const doc = await Model.findOne({ _id: req.params.id, ...scopeFilter });
      if (!doc) return res.status(404).json({ message: "Not found" });
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  };

  const updateById = async (req, res) => {
    try {
      const scopeFilter = buildScopeFilter(req, scope);
      const updated = await Model.findOneAndUpdate(
        { _id: req.params.id, ...scopeFilter },
        req.body,
        { new: true }
      );
      if (!updated) return res.status(404).json({ message: "Not found" });
      return res.status(200).json({ message: "Updated successfully", data: updated });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  };

  const deleteById = async (req, res) => {
    try {
      const scopeFilter = buildScopeFilter(req, scope);
      const deleted = await Model.findOneAndDelete({ _id: req.params.id, ...scopeFilter });
      if (!deleted) return res.status(404).json({ message: "Not found" });
      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  };

  return { create, getAll, getById, updateById, deleteById };
}

