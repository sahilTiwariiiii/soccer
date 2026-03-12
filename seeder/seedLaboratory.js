import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import User from '../models/User.js';
import PatientRegistration from '../models/PatientRegistration.js';
import InvestigationMaster from '../models/Investigation.js';
import InvestigationOrder from '../models/InvestigationOrder.js';
import LabSample from '../models/laboratorymanagement/LabSample.js';
import LabResult from '../models/laboratorymanagement/LabResult.js';
import Equipment from '../models/equipmentmanagement/EquipmentSchema.js';
import EquipmentCategory from '../models/equipmentmanagement/EquipmentCategorySchema.js';

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

  console.log('--- Seeding Laboratory Module ---');

  // 1. Seed Lab Investigation Masters
  const labTests = [
    { name: 'Complete Blood Count (CBC)', category: 'Lab', price: 350 },
    { name: 'Liver Function Test (LFT)', category: 'Lab', price: 850 },
    { name: 'Kidney Function Test (KFT)', category: 'Lab', price: 650 },
    { name: 'Urine Routine & Microscopy', category: 'Lab', price: 200 },
  ];

  const testDocs = [];
  for (const t of labTests) {
    let doc = await InvestigationMaster.findOne({ name: t.name, hospitalId: hospital._id });
    if (!doc) {
      doc = await InvestigationMaster.create({ ...t, hospitalId: hospital._id, branchId: branch._id, createdBy: user._id });
      console.log(`Created Lab Investigation Master: ${t.name}`);
    }
    testDocs.push(doc);
  }

  // 2. Seed Investigation Orders
  const orderData = [
    { patientId: patient._id, investigationId: testDocs[0]._id, encounterType: 'OPD', priceAtOrderTime: testDocs[0].price, priority: 'Normal', source: 'Digital', orderStatus: 'In-Progress' },
    { patientId: patient._id, investigationId: testDocs[1]._id, encounterType: 'OPD', priceAtOrderTime: testDocs[1].price, priority: 'Urgent', source: 'Digital', orderStatus: 'Ordered' },
  ];

  const orderDocs = [];
  for (const o of orderData) {
    let doc = await InvestigationOrder.create({ ...o, hospitalId: hospital._id, branchId: branch._id, createdBy: user._id });
    console.log(`Created Investigation Order for: ${patient.patientName}`);
    orderDocs.push(doc);
  }

  // 3. Seed Lab Samples
  const sampleData = [
    { investigationOrderId: orderDocs[0]._id, sampleType: 'Blood (EDTA)', barcode: 'BC-6001', status: 'Processing', collectedBy: user._id, collectedAt: new Date() },
  ];

  const sampleDocs = [];
  for (const s of sampleData) {
    let doc = await LabSample.create({ ...s, hospitalId: hospital._id, branchId: branch._id });
    console.log(`Created Lab Sample: ${s.barcode}`);
    sampleDocs.push(doc);
  }

  // 4. Seed Lab Results
  const resultData = [
    { 
      investigationOrderId: orderDocs[0]._id, 
      labSampleId: sampleDocs[0]._id, 
      resultStatus: 'Completed',
      parameters: [
        { parameterName: 'Hemoglobin', value: '14.5', unit: 'g/dL', normalRange: '13-17', isAbnormal: false },
        { parameterName: 'WBC Count', value: '8500', unit: '/cumm', normalRange: '4000-11000', isAbnormal: false },
        { parameterName: 'Platelet Count', value: '2.5', unit: 'Lakhs/cumm', normalRange: '1.5-4.5', isAbnormal: false },
      ]
    },
  ];

  for (const r of resultData) {
    await LabResult.create({ ...r, hospitalId: hospital._id, branchId: branch._id });
    console.log(`Created Lab Result for Sample ID: ${r.labSampleId}`);
  }

  // 5. Seed Lab Equipment
  let labCategory = await EquipmentCategory.findOne({ name: 'Laboratory', hospitalId: hospital._id });
  if (!labCategory) {
    labCategory = await EquipmentCategory.create({ name: 'Laboratory', hospitalId: hospital._id, branchId: branch._id, description: 'Lab analyzers and tools' });
  }

  const labEquipData = [
    { name: 'Hematology Analyzer', equipmentCode: 'EQ-LAB-01', brand: 'Sysmex', model: 'XN-1000', purchaseCost: 1500000, status: 'active', categoryId: labCategory._id },
    { name: 'Biochemistry Analyzer', equipmentCode: 'EQ-LAB-02', brand: 'Roche', model: 'Cobas c311', purchaseCost: 2500000, status: 'active', categoryId: labCategory._id },
  ];

  for (const e of labEquipData) {
    let exists = await Equipment.findOne({ equipmentCode: e.equipmentCode, hospitalId: hospital._id });
    if (!exists) {
      await Equipment.create({ ...e, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Lab Equipment: ${e.name}`);
    }
  }

  console.log('Laboratory Seeding completed!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
