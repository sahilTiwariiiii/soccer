import LeaveRequest from "../../models/usermanagement/LeaveRequest.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";

export const applyLeave = catchAsync(async (req, res, next) => {
  const { leaveType, startDate, endDate, reason, attachment } = req.body;
  
  const totalDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

  const newLeave = new LeaveRequest({
    userId: req.user._id,
    leaveType,
    startDate,
    endDate,
    totalDays,
    reason,
    attachment,
    hospitalId: req.user.hospitalId,
    branchId: req.user.branchId
  });

  await newLeave.save();

  res.status(201).json({
    status: "success",
    data: newLeave
  });
});

export const getMyLeaves = catchAsync(async (req, res, next) => {
  const leaves = await LeaveRequest.find({ userId: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: leaves.length,
    data: leaves
  });
});

export const getLeaveRequests = catchAsync(async (req, res, next) => {
  const { status, userId } = req.query;
  const query = { hospitalId: req.user.hospitalId };

  if (status) query.status = status;
  if (userId) query.userId = userId;

  const requests = await LeaveRequest.find(query).populate("userId", "name employee_id email").sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: requests.length,
    data: requests
  });
});

export const approveRejectLeave = catchAsync(async (req, res, next) => {
  const { leaveId, status, comment } = req.body;

  const leave = await LeaveRequest.findById(leaveId);

  if (!leave) {
    return next(new AppError("Leave request not found.", 404));
  }

  if (leave.status !== "Pending") {
    return next(new AppError("Leave request has already been processed.", 400));
  }

  leave.status = status;
  leave.comment = comment;
  leave.approvedBy = req.user._id;

  await leave.save();

  res.status(200).json({
    status: "success",
    data: leave
  });
});
