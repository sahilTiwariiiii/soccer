import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import User from '../models/User.js';
import PatientRegistration from '../models/PatientRegistration.js';
import InvestigationMaster from '../models/Investigation.js';
import InvestigationOrder from '../models/InvestigationOrder.js';
import RadiologyStudy from '../models/radiology/RadiologyStudy.js';
import RadiologyReport from '../models/radiology/RadiologyReport.js';

dotenv.config();

async function run() {
  await ConnectDb();

  const hospital = await Hospital.findOne();
  const branch = await Branch.findOne();
  const user = await User.findOne();
  const patient = await PatientRegistration.findOne();

  if (!hospital || !branch || !user || !patient) {
    console.error('Required infrastructure (Hospital, Branch, User, Patient) not found.');
    process.exit(1);
  }

  console.log('--- Seeding Radiology Module ---');

  // 1. Seed Radiology Investigation Masters
  const radiologyTests = [
    { name: 'X-Ray Chest PA View', category: 'Radiology', price: 500 },
    { name: 'CT Brain Plain', category: 'Radiology', price: 3500 },
    { name: 'MRI Knee Joint', category: 'Radiology', price: 8000 },
    { name: 'USG Whole Abdomen', category: 'Radiology', price: 1200 },
  ];

  const testDocs = [];
  for (const t of radiologyTests) {
    let doc = await InvestigationMaster.findOne({ name: t.name, hospitalId: hospital._id });
    if (!doc) {
      doc = await InvestigationMaster.create({ ...t, hospitalId: hospital._id, branchId: branch._id, createdBy: user._id });
      console.log(`Created Investigation Master: ${t.name}`);
    }
    testDocs.push(doc);
  }

  // 2. Seed Investigation Orders
  const orderData = [
    { patientId: patient._id, investigationId: testDocs[0]._id, encounterType: 'OPD', priceAtOrderTime: testDocs[0].price, priority: 'Normal', source: 'Digital', orderStatus: 'Completed' },
    { patientId: patient._id, investigationId: testDocs[1]._id, encounterType: 'OPD', priceAtOrderTime: testDocs[1].price, priority: 'Urgent', source: 'Digital', orderStatus: 'In-Progress' },
  ];

  const orderDocs = [];
  for (const o of orderData) {
    let doc = await InvestigationOrder.create({ ...o, hospitalId: hospital._id, branchId: branch._id, createdBy: user._id });
    console.log(`Created Investigation Order for: ${patient.patientName}`);
    orderDocs.push(doc);
  }

  // 3. Seed Radiology Studies
  const studyData = [
    { investigationOrderId: orderDocs[0]._id, modality: 'XRay', status: 'Completed', scheduledAt: new Date(), completedAt: new Date(), technicianId: user._id, radiologistId: user._id },
    { investigationOrderId: orderDocs[1]._id, modality: 'CT', status: 'In-Progress', scheduledAt: new Date(), technicianId: user._id },
  ];

  const studyDocs = [];
  for (const s of studyData) {
    let doc = await RadiologyStudy.create({ ...s, hospitalId: hospital._id, branchId: branch._id });
    console.log(`Created Radiology Study: ${s.modality}`);
    studyDocs.push(doc);
  }

  // 4. Seed Radiology Reports
  const reportData = [
    { radiologyStudyId: studyDocs[0]._id, findings: 'Normal chest X-ray findings.', impression: 'No abnormality detected.', reportStatus: 'Final', reportedBy: user._id, verifiedBy: user._id, verifiedAt: new Date() },
  ];

  for (const r of reportData) {
    await RadiologyReport.create({ ...r, hospitalId: hospital._id, branchId: branch._id });
    console.log(`Created Radiology Report for Study ID: ${r.radiologyStudyId}`);
  }

  console.log('Radiology Seeding completed!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
