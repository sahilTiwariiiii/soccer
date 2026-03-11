import User from "../models/User.js";
import Role from "../models/Role.js";

export const listUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (role) {
      const roleDoc = await Role.findOne({ name: role });
      if (roleDoc) {
        filter.role = roleDoc._id;
      }
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }
    const docs = await User.find(filter)
      .populate('role')
      .populate('hospitalId', 'name')
      .populate('branchId', 'name')
      .populate('department_id', 'name')
      .sort({ created_at: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await User.countDocuments(filter);
    return res.status(200).json({ total, page: Number(page), limit: Number(limit), data: docs });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate('role')
      .populate('hospitalId', 'name')
      .populate('branchId', 'name')
      .populate('department_id', 'name');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ data: user });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })
      .populate('role')
      .populate('hospitalId', 'name')
      .populate('branchId', 'name')
      .populate('department_id', 'name');
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ data: updatedUser });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
