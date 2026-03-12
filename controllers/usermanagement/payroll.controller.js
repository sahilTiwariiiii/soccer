import Payroll from "../../models/usermanagement/Payroll.js";
import SalaryStructure from "../../models/usermanagement/SalaryStructure.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";

export const generatePayroll = catchAsync(async (req, res, next) => {
  const { month, year, userId } = req.body;

  const structure = await SalaryStructure.findOne({ userId });

  if (!structure) {
    return next(new AppError("Salary structure not found for user.", 404));
  }

  const existingPayroll = await Payroll.findOne({ userId, month, year });

  if (existingPayroll) {
    return next(new AppError("Payroll already generated for this month/year.", 400));
  }

  const newPayroll = new Payroll({
    userId,
    month,
    year,
    basic: structure.basic,
    hra: structure.hra,
    conveyance: structure.conveyance,
    specialAllowance: structure.specialAllowance,
    medicalAllowance: structure.medicalAllowance,
    totalEarnings: structure.totalGross,
    totalDeductions: 0, // Simplified for now
    netSalary: structure.totalNet,
    hospitalId: req.user.hospitalId,
    branchId: req.user.branchId
  });

  await newPayroll.save();

  res.status(201).json({
    status: "success",
    data: newPayroll
  });
});

export const getMyPayrolls = catchAsync(async (req, res, next) => {
  const payrolls = await Payroll.find({ userId: req.user._id }).sort({ year: -1, month: -1 });

  res.status(200).json({
    status: "success",
    results: payrolls.length,
    data: payrolls
  });
});

export const getPayrollHistory = catchAsync(async (req, res, next) => {
  const { month, year, userId } = req.query;
  const query = { hospitalId: req.user.hospitalId };

  if (month) query.month = month;
  if (year) query.year = year;
  if (userId) query.userId = userId;

  const payrolls = await Payroll.find(query).populate("userId", "name employee_id email").sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: payrolls.length,
    data: payrolls
  });
});

export const processPayroll = catchAsync(async (req, res, next) => {
  const { payrollId, status, paymentDate, paymentReference } = req.body;

  const payroll = await Payroll.findById(payrollId);

  if (!payroll) {
    return next(new AppError("Payroll record not found.", 404));
  }

  payroll.paymentStatus = status;
  payroll.paymentDate = paymentDate;
  payroll.paymentReference = paymentReference;

  await payroll.save();

  res.status(200).json({
    status: "success",
    data: payroll
  });
});
