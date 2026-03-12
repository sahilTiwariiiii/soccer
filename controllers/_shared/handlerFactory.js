
export const createCrudHandlers = ({ Model, scope = [] }) => {
  const applyScope = (filter, user) => {
    const scopedFilter = { ...filter };
    scope.forEach(sc => {
      if (user[sc.tokenKey]) {
        scopedFilter[sc.modelField] = user[sc.tokenKey];
      }
    });
    return scopedFilter;
  };

  const create = async (req, res) => {
    try {
      const user = req.user || {};
      const data = { ...req.body };
      scope.forEach(sc => {
        if (user[sc.tokenKey]) {
          data[sc.modelField] = user[sc.tokenKey];
        }
      });

      const doc = await Model.create(data);
      return res.status(201).json({ message: "Created successfully", data: doc });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const getAll = async (req, res) => {
    try {
      const user = req.user || {};
      const { page = 1, limit = 10, ...query } = req.query;
      const filter = applyScope(query, user);
      
      const docs = await Model.find(filter)
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      const total = await Model.countDocuments(filter);

      return res.status(200).json({ total, page: Number(page), limit: Number(limit), data: docs });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const getById = async (req, res) => {
    try {
      const user = req.user || {};
      const filter = applyScope({ _id: req.params.id }, user);
      const doc = await Model.findOne(filter);
      if (!doc) return res.status(404).json({ message: "Not found" });
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const updateById = async (req, res) => {
    try {
      const user = req.user || {};
      const filter = applyScope({ _id: req.params.id }, user);
      const updated = await Model.findOneAndUpdate(filter, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: "Not found" });
      return res.status(200).json({ message: "Updated successfully", data: updated });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const deleteById = async (req, res) => {
    try {
      const user = req.user || {};
      const filter = applyScope({ _id: req.params.id }, user);
      const deleted = await Model.findOneAndDelete(filter);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  return { create, getAll, getById, updateById, deleteById };
};
