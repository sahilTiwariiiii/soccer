
import PatientRegistration from "../models/PatientRegistration.js";
import PatientVisit from "../models/PatientVisitSchema.js";
import Receipt from "../models/PatientReceipt.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await PatientRegistration.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const opdToday = await PatientVisit.countDocuments({
      visitType: "OPD",
      visitDate: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    const ipdAdmitted = await PatientVisit.countDocuments({
      visitType: "IPD",
      status: { $ne: "Completed" },
    });

    const totalEarningsResult = await Receipt.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$fee" },
        },
      },
    ]);

    const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].total : 0;

    res.status(200).json({
      totalPatients,
      opdToday,
      ipdAdmitted,
      totalEarnings,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};
