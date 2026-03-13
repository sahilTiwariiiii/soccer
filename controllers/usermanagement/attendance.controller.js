import Attendance from "../../models/usermanagement/Attendance.js";
import catchAsync from "../_shared/catchAsync.js";
import AppError from "../../utils/AppError.js";

export const clockIn = catchAsync(async (req, res, next) => {
  const { location, device } = req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if already clocked in today
  let attendance = await Attendance.findOne({
    userId: req.user._id,
    date: today
  });

  if (attendance && attendance.clockIn.time) {
    return next(new AppError("You have already clocked in for today.", 400));
  }

  if (!attendance) {
    attendance = new Attendance({
      userId: req.user._id,
      date: today,
      hospitalId: req.user.hospitalId,
      branchId: req.user.branchId
    });
  }

  attendance.clockIn = {
    time: new Date(),
    location,
    device,
    ip: req.ip
  };

  await attendance.save();

  res.status(200).json({
    status: "success",
    data: attendance
  });
});

export const clockOut = catchAsync(async (req, res, next) => {
  const { location, device } = req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    userId: req.user._id,
    date: today
  });

  if (!attendance || !attendance.clockIn.time) {
    return next(new AppError("No clock-in record found for today.", 404));
  }

  if (attendance.clockOut.time) {
    return next(new AppError("You have already clocked out for today.", 400));
  }

  attendance.clockOut = {
    time: new Date(),
    location,
    device,
    ip: req.ip
  };

  // Calculate work hours
  const workMs = attendance.clockOut.time - attendance.clockIn.time;
  attendance.workHours = workMs / (1000 * 60 * 60);

  await attendance.save();

  res.status(200).json({
    status: "success",
    data: attendance
  });
});

export const getAttendanceHistory = catchAsync(async (req, res, next) => {
  const { startDate, endDate, userId } = req.query;
  const targetUserId = userId || req.user._id;

  const query = { userId: targetUserId };

  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const history = await Attendance.find(query).sort({ date: -1 });

  res.status(200).json({
    status: "success",
    results: history.length,
    data: history
  });
});

export const regularizeAttendance = catchAsync(async (req, res, next) => {
  const { attendanceId, clockIn, clockOut, reason } = req.body;

  const attendance = await Attendance.findById(attendanceId);

  if (!attendance) {
    return next(new AppError("Attendance record not found.", 404));
  }

  if (clockIn) attendance.clockIn.time = new Date(clockIn);
  if (clockOut) attendance.clockOut.time = new Date(clockOut);
  
  attendance.isRegularized = true;
  attendance.regularizationReason = reason;

  // Recalculate work hours if both times are present
  if (attendance.clockIn.time && attendance.clockOut.time) {
    const workMs = attendance.clockOut.time - attendance.clockIn.time;
    attendance.workHours = workMs / (1000 * 60 * 60);
  }

  await attendance.save();

  res.status(200).json({
    status: "success",
    data: attendance
  });
});
