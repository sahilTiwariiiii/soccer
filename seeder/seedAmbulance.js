import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import User from '../models/User.js';
import Patient from '../models/PatientRegistration.js';
import PatientVisit from '../models/PatientVisitSchema.js';
import AmbulanceMaster from '../models/ambulance/AmbulanceMaster.js';
import AmbulanceTrip from '../models/ambulance/AmbulanceTrip.js';
import AmbulanceMaintenance from '../models/ambulance/AmbulanceMaintenance.js';
import AmbulanceAssignment from '../models/ambulance/AmbulanceAssignment.js';

dotenv.config();

async function run() {
  await ConnectDb();

  const hospital = await Hospital.findOne();
  const branch = await Branch.findOne();
  const user = await User.findOne(); // Assuming this is an admin or manager
  const patient = await Patient.findOne();
  const visit = await PatientVisit.findOne();

  if (!hospital || !branch || !user) {
    console.error('Hospital, Branch or User not found. Run createInfra.js first.');
    process.exit(1);
  }

  const driver = await User.findOne({ hospitalId: hospital._id }) || user;

  console.log('--- Seeding Ambulance Module ---');

  // 1. Create Ambulance Fleet
  const fleetData = [
    { vehicleNumber: 'DL-01-AMB-1001', type: 'Advanced', contactNumber: '9876543210', isActive: true },
    { vehicleNumber: 'DL-01-AMB-1002', type: 'Basic', contactNumber: '9876543211', isActive: true },
    { vehicleNumber: 'DL-01-AMB-1003', type: 'ICU', contactNumber: '9876543212', isActive: true },
    { vehicleNumber: 'DL-01-AMB-1004', type: 'Basic', contactNumber: '9876543213', isActive: true },
    { vehicleNumber: 'DL-01-AMB-1005', type: 'Advanced', contactNumber: '9876543214', isActive: false },
  ];

  const ambulanceDocs = [];
  for (const f of fleetData) {
    let doc = await AmbulanceMaster.findOne({ vehicleNumber: f.vehicleNumber, hospitalId: hospital._id });
    if (!doc) {
      doc = await AmbulanceMaster.create({ 
        ...f, 
        hospitalId: hospital._id, 
        branchId: branch._id,
        driverId: driver._id
      });
      console.log(`Created Ambulance: ${f.vehicleNumber}`);
    }
    ambulanceDocs.push(doc);
  }

  // 2. Create Assignments
  const assignmentData = [
    { ambulanceId: ambulanceDocs[0]._id, driverId: driver._id, startTime: new Date(), status: 'Active' },
    { ambulanceId: ambulanceDocs[1]._id, driverId: driver._id, startTime: new Date(), status: 'Active' },
  ];

  for (const a of assignmentData) {
    const exists = await AmbulanceAssignment.findOne({ ambulanceId: a.ambulanceId, status: 'Active' });
    if (!exists) {
      await AmbulanceAssignment.create({
        ...a,
        hospitalId: hospital._id,
        branchId: branch._id,
        createdBy: user._id
      });
      console.log(`Assigned Driver to ${ambulanceDocs.find(amb => amb._id.equals(a.ambulanceId)).vehicleNumber}`);
    }
  }

  // 3. Create Maintenance Records
  const maintenanceData = [
    { ambulanceId: ambulanceDocs[4]._id, type: 'Repair', description: 'Engine overheating issue', cost: 15000, maintenanceDate: new Date() },
    { ambulanceId: ambulanceDocs[0]._id, type: 'Routine', description: 'Regular oil change and brake check', cost: 5000, maintenanceDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  ];

  for (const m of maintenanceData) {
    const exists = await AmbulanceMaintenance.findOne({ ambulanceId: m.ambulanceId, description: m.description });
    if (!exists) {
      await AmbulanceMaintenance.create({
        ...m,
        hospitalId: hospital._id,
        branchId: branch._id,
        performedBy: user._id
      });
      console.log(`Created Maintenance record for ${ambulanceDocs.find(amb => amb._id.equals(m.ambulanceId)).vehicleNumber}`);
    }
  }

  // 4. Create Trips
  if (patient && visit) {
    const tripData = [
      { 
        ambulanceId: ambulanceDocs[0]._id, 
        patientId: patient._id, 
        visitId: visit._id,
        driverId: driver._id,
        fromLocation: 'Sector 62, Noida',
        toLocation: 'GUC Hospital',
        tripType: 'Emergency',
        status: 'Completed',
        requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        dispatchedAt: new Date(Date.now() - 1.9 * 60 * 60 * 1000),
        arrivedAtPatient: new Date(Date.now() - 1.7 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000)
      },
      { 
        ambulanceId: ambulanceDocs[1]._id, 
        patientId: patient._id, 
        visitId: visit._id,
        driverId: driver._id,
        fromLocation: 'GUC Hospital',
        toLocation: 'AIIMS Delhi',
        tripType: 'Transfer',
        status: 'OnWay',
        requestedAt: new Date(),
        dispatchedAt: new Date()
      }
    ];

    for (const t of tripData) {
      const exists = await AmbulanceTrip.findOne({ 
        ambulanceId: t.ambulanceId, 
        requestedAt: t.requestedAt 
      });
      if (!exists) {
        await AmbulanceTrip.create({
          ...t,
          hospitalId: hospital._id,
          branchId: branch._id,
          createdBy: user._id
        });
        console.log(`Created Trip record for ${ambulanceDocs.find(amb => amb._id.equals(t.ambulanceId)).vehicleNumber}`);
      }
    }
  } else {
    console.warn('Patient or Visit not found. Skipping Trip seeding.');
  }

  console.log('Ambulance Seeding completed!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
