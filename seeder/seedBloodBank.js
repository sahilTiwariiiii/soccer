import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import User from '../models/User.js';
import Patient from '../models/PatientRegistration.js';
import BloodGroup from '../models/bloodbank/BloodGroup.js';
import BloodDonor from '../models/bloodbank/BloodDonor.js';
import BloodDonation from '../models/bloodbank/BloodDonation.js';
import BloodComponent from '../models/bloodbank/BloodComponent.js';
import BloodInventory from '../models/bloodbank/BloodInventory.js';
import BloodRequest from '../models/bloodbank/BloodRequest.js';

dotenv.config();

async function run() {
  await ConnectDb();

  const hospital = await Hospital.findOne();
  const branch = await Branch.findOne();
  const user = await User.findOne();
  const patient = await Patient.findOne();

  if (!hospital || !branch || !user || !patient) {
    console.error('Required infrastructure (Hospital, Branch, User, Patient) not found.');
    process.exit(1);
  }

  console.log('--- Seeding Blood Bank Module ---');

  // 1. Seed Blood Groups
  const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const groupDocs = [];
  for (const name of groups) {
    let doc = await BloodGroup.findOne({ name });
    if (!doc) {
      doc = await BloodGroup.create({ name });
      console.log(`Created Blood Group: ${name}`);
    }
    groupDocs.push(doc);
  }

  // 2. Seed Donors
  const donorData = [
    { donorId: 'D-1001', firstName: 'Rahul', lastName: 'Sharma', gender: 'Male', phone: '9876543210', bloodGroup: groupDocs[0]._id },
    { donorId: 'D-1002', firstName: 'Priya', lastName: 'Singh', gender: 'Female', phone: '9876543211', bloodGroup: groupDocs[6]._id },
  ];
  const donorDocs = [];
  for (const d of donorData) {
    let doc = await BloodDonor.findOne({ donorId: d.donorId });
    if (!doc) {
      doc = await BloodDonor.create({ ...d, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Donor: ${d.firstName} ${d.lastName}`);
    }
    donorDocs.push(doc);
  }

  // 3. Seed Donations
  const donationData = [
    { donationNumber: 'DN-2001', donorId: donorDocs[0]._id, donationDate: new Date(), bloodGroup: groupDocs[0]._id, bagNumber: 'BAG-A1-001' },
    { donationNumber: 'DN-2002', donorId: donorDocs[1]._id, donationDate: new Date(), bloodGroup: groupDocs[6]._id, bagNumber: 'BAG-O1-001' },
  ];
  const donationDocs = [];
  for (const d of donationData) {
    let doc = await BloodDonation.findOne({ donationNumber: d.donationNumber });
    if (!doc) {
      doc = await BloodDonation.create({ ...d, hospitalId: hospital._id, branchId: branch._id, collectedBy: user._id });
      console.log(`Created Donation: ${d.donationNumber}`);
    }
    donationDocs.push(doc);
  }

  // 4. Seed Components
  const componentData = [
    { donationId: donationDocs[0]._id, componentType: 'PRBC', quantityML: 300, expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    { donationId: donationDocs[1]._id, componentType: 'Whole Blood', quantityML: 450, expiryDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000) },
  ];
  const componentDocs = [];
  for (const c of componentData) {
    let doc = await BloodComponent.findOne({ donationId: c.donationId, componentType: c.componentType });
    if (!doc) {
      doc = await BloodComponent.create({ ...c, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Component: ${c.componentType}`);
    }
    componentDocs.push(doc);
  }

  // 5. Seed Inventory
  for (let i = 0; i < componentDocs.length; i++) {
    const exists = await BloodInventory.findOne({ componentId: componentDocs[i]._id });
    if (!exists) {
      await BloodInventory.create({
        hospitalId: hospital._id,
        branchId: branch._id,
        componentId: componentDocs[i]._id,
        bloodGroup: i === 0 ? groupDocs[0]._id : groupDocs[6]._id,
        currentStatus: 'Available'
      });
      console.log(`Added to Inventory: ${componentDocs[i].componentType}`);
    }
  }

  // 6. Seed Requests
  const requestData = [
    { patientId: patient._id, bloodGroup: groupDocs[0]._id, componentType: 'PRBC', quantityUnits: 1, status: 'Pending' },
    { patientId: patient._id, bloodGroup: groupDocs[6]._id, componentType: 'Whole Blood', quantityUnits: 1, status: 'Approved' },
  ];
  for (const r of requestData) {
    const exists = await BloodRequest.findOne({ patientId: r.patientId, bloodGroup: r.bloodGroup, componentType: r.componentType });
    if (!exists) {
      await BloodRequest.create({ ...r, hospitalId: hospital._id, branchId: branch._id, requestedBy: user._id });
      console.log(`Created Blood Request for ${patient.patientName}`);
    }
  }

  console.log('Blood Bank Seeding completed!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
