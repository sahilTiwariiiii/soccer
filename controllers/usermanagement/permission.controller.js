import PermissionGroup from "../../models/usermanagement/PermissionGroup.js";
import catchAsync from "../_shared/catchAsync.js";
import AppError from "../../utils/AppError.js";

export const createPermissionGroup = catchAsync(async (req, res, next) => {
  const { name, permissions, description } = req.body;

  const newGroup = new PermissionGroup({
    name,
    permissions,
    description,
    hospitalId: req.user.hospitalId,
    branchId: req.user.branchId
  });

  await newGroup.save();

  res.status(201).json({
    status: "success",
    data: newGroup
  });
});

export const getPermissionGroups = catchAsync(async (req, res, next) => {
  const groups = await PermissionGroup.find({ hospitalId: req.user.hospitalId });

  res.status(200).json({
    status: "success",
    results: groups.length,
    data: groups
  });
});

export const updatePermissionGroup = catchAsync(async (req, res, next) => {
  const { groupId, name, permissions, description } = req.body;

  const group = await PermissionGroup.findByIdAndUpdate(groupId, {
    name,
    permissions,
    description
  }, { new: true, runValidators: true });

  if (!group) {
    return next(new AppError("Permission group not found.", 404));
  }

  res.status(200).json({
    status: "success",
    data: group
  });
});

export const deletePermissionGroup = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;

  const group = await PermissionGroup.findByIdAndDelete(groupId);

  if (!group) {
    return next(new AppError("Permission group not found.", 404));
  }

  res.status(204).json({
    status: "success",
    data: null
  });
});
