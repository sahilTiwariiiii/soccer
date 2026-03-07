import User from "../models/User.js";

export const listUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }
    const docs = await User.find(filter)
      .sort({ created_at: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await User.countDocuments(filter);
    return res.status(200).json({ total, page: Number(page), limit: Number(limit), data: docs });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
