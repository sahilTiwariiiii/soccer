import AmbulanceTrip from "../models/ambulance/AmbulanceTrip.js";
import AmbulanceMaster from "../models/ambulance/AmbulanceMaster.js";
import User from "../models/User.js"; // For driver/patient population
import PatientRegistration from "../models/PatientRegistration.js";
import PatientVisit from "../models/PatientVisit.js";

/* =================================
   1️⃣ Create a Trip
================================= */
export const createAmbulanceTrip = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { ambulanceId, driverId, patientId, visitId, fromLocation, toLocation, tripType, remarks } = req.body;

    // Validate ambulance exists in hospital/branch
    const ambulance = await AmbulanceMaster.findOne({ _id: ambulanceId, hospitalId, branchId });
    if (!ambulance) return res.status(404).json({ message: "Ambulance not found in this branch" });

    const trip = await AmbulanceTrip.create({
      hospitalId,
      branchId,
      ambulanceId,
      driverId,
      patientId,
      visitId,
      fromLocation,
      toLocation,
      tripType: tripType || "Routine",
      status: "Requested",
      requestedAt: new Date(),
      remarks,
      createdBy: userId
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   2️⃣ Update Trip Status & Timestamps
   (Dispatched, ArrivedAtPatient, LeftPatient, ArrivedAtHospital, Completed, Cancelled)
================================= */
export const updateTripStatus = async (req, res) => {
  try {
    const { hospitalId, branchId, _id: userId } = req.user;
    const { status, dispatchedAt, arrivedAtPatient, leftPatient, arrivedAtHospital, completedAt } = req.body;

    const updatedTrip = await AmbulanceTrip.findOneAndUpdate(
      { _id: req.params.id, hospitalId, branchId },
      { status, dispatchedAt, arrivedAtPatient, leftPatient, arrivedAtHospital, completedAt },
      { new: true }
    )
    .populate("ambulanceId")
    .populate("driverId", "name email")
    .populate("patientId", "name")
    .populate("visitId");

    if (!updatedTrip) return res.status(404).json({ message: "Trip not found or unauthorized" });

    res.json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   3️⃣ Get All Trips (With Filters)
================================= */
export const getAmbulanceTrips = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;
    const { ambulanceId, driverId, patientId, status, tripType } = req.query;

    const filter = { hospitalId, branchId };
    if (ambulanceId) filter.ambulanceId = ambulanceId;
    if (driverId) filter.driverId = driverId;
    if (patientId) filter.patientId = patientId;
    if (status) filter.status = status;
    if (tripType) filter.tripType = tripType;

    const trips = await AmbulanceTrip.find(filter)
      .populate("ambulanceId")
      .populate("driverId", "name email")
      .populate("patientId", "name")
      .populate("visitId")
      .sort({ requestedAt: -1 });

    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   4️⃣ Get Single Trip
================================= */
export const getSingleAmbulanceTrip = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const trip = await AmbulanceTrip.findOne({ _id: req.params.id, hospitalId, branchId })
      .populate("ambulanceId")
      .populate("driverId", "name email")
      .populate("patientId", "name")
      .populate("visitId");

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =================================
   5️⃣ Delete Trip (Optional)
================================= */
export const deleteAmbulanceTrip = async (req, res) => {
  try {
    const { hospitalId, branchId } = req.user;

    const deleted = await AmbulanceTrip.findOneAndDelete({ _id: req.params.id, hospitalId, branchId });
    if (!deleted) return res.status(404).json({ message: "Trip not found or unauthorized" });

    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};