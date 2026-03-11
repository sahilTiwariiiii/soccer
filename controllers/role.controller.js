import Role from "../models/Role.js";

// Create a new role
export const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const { hospitalId, branchId } = req.user;

    const newRole = new Role({
      name,
      permissions,
      hospitalId,
      branchId,
    });

    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all roles for a branch
export const getRoles = async (req, res) => {
  try {
    const { branchId } = req.user;
    const roles = await Role.find({ branchId });
    res.status(200).json({ data: roles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single role by ID
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name, permissions },
      { new: true }
    );
    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a role
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
