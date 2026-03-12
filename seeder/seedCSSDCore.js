import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import User from '../models/User.js';
import InstrumentMaster from '../models/cssdandsterilization/InstrumentMaster.js';
import InstrumentBatch from '../models/cssdandsterilization/InstrumentBatch.js';
import SterilizationCycle from '../models/cssdandsterilization/SterilizationCycle.js';
import Equipment from '../models/equipmentmanagement/EquipmentSchema.js';
import EquipmentCategory from '../models/equipmentmanagement/EquipmentCategorySchema.js';
import MaintenanceLog from '../models/equipmentmanagement/MaintenanceLogSchema.js';

dotenv.config();

async function run() {
  await ConnectDb();

  const hospital = await Hospital.findOne();
  const branch = await Branch.findOne();
  const user = await User.findOne();

  if (!hospital || !branch || !user) {
    console.error('Required infrastructure (Hospital, Branch, User) not found.');
    process.exit(1);
  }

  console.log('--- Seeding CSSD & Core Module ---');

  // 1. Seed Instrument Masters
  const instrumentData = [
    { name: 'General Surgery Scissors', category: 'Scissors', code: 'INS-001' },
    { name: 'Artery Forceps', category: 'Forceps', code: 'INS-002' },
    { name: 'Scalpel Handle', category: 'Handle', code: 'INS-003' },
    { name: 'Retractor', category: 'Retractor', code: 'INS-004' },
  ];
  const instrumentDocs = [];
  for (const d of instrumentData) {
    let doc = await InstrumentMaster.findOne({ code: d.code, hospitalId: hospital._id });
    if (!doc) {
      doc = await InstrumentMaster.create({ ...d, hospitalId: hospital._id, branchId: branch._id, createdBy: user._id });
      console.log(`Created Instrument: ${d.name}`);
    }
    instrumentDocs.push(doc);
  }

  // 2. Seed Instrument Batches
  const batchData = [
    { batchNumber: 'BAT-2026-001', sterilizationDate: new Date(), expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    { batchNumber: 'BAT-2026-002', sterilizationDate: new Date(), expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) },
  ];
  const batchDocs = [];
  for (let i = 0; i < batchData.length; i++) {
    let doc = await InstrumentBatch.findOne({ batchNumber: batchData[i].batchNumber, hospitalId: hospital._id });
    if (!doc) {
      doc = await InstrumentBatch.create({
        ...batchData[i],
        hospitalId: hospital._id,
        branchId: branch._id,
        instruments: [
          { instrumentId: instrumentDocs[0]._id, quantity: 5 },
          { instrumentId: instrumentDocs[1]._id, quantity: 10 },
        ],
        sterilizationBy: user._id,
        status: 'Ready'
      });
      console.log(`Created Batch: ${batchData[i].batchNumber}`);
    }
    batchDocs.push(doc);
  }

  // 3. Seed Sterilization Cycles
  const cycleData = [
    { cycleNumber: 5001, machineUsed: 'Autoclave-1', status: 'Completed', endTime: new Date() },
    { cycleNumber: 5002, machineUsed: 'ETO Sterilizer', status: 'Pending' },
  ];
  for (let i = 0; i < cycleData.length; i++) {
    const exists = await SterilizationCycle.findOne({ cycleNumber: cycleData[i].cycleNumber, hospitalId: hospital._id });
    if (!exists) {
      await SterilizationCycle.create({
        ...cycleData[i],
        hospitalId: hospital._id,
        branchId: branch._id,
        batchId: batchDocs[i]._id,
        performedBy: user._id
      });
      console.log(`Created Cycle: ${cycleData[i].cycleNumber}`);
    }
  }

  // 4. Seed Equipment Categories
  const categoryNames = ['Imaging', 'Life Support', 'Diagnostic', 'Sterilization'];
  const categoryDocs = [];
  for (const name of categoryNames) {
    let doc = await EquipmentCategory.findOne({ name, hospitalId: hospital._id });
    if (!doc) {
      doc = await EquipmentCategory.create({ name, hospitalId: hospital._id, branchId: branch._id, description: `${name} equipment category` });
      console.log(`Created Category: ${name}`);
    }
    categoryDocs.push(doc);
  }

  // 5. Seed Equipment
  const equipmentData = [
    { name: 'MRI Machine', equipmentCode: 'EQ-MRI-01', brand: 'GE', model: 'Signa', purchaseCost: 5000000, status: 'active', categoryId: categoryDocs[0]._id },
    { name: 'Ventilator', equipmentCode: 'EQ-VEN-01', brand: 'Philips', model: 'V60', purchaseCost: 1200000, status: 'active', categoryId: categoryDocs[1]._id },
    { name: 'Autoclave-1', equipmentCode: 'EQ-ATC-01', brand: 'Tuttnauer', model: '3870E', purchaseCost: 350000, status: 'active', categoryId: categoryDocs[3]._id },
  ];
  const equipmentDocs = [];
  for (const d of equipmentData) {
    let doc = await Equipment.findOne({ equipmentCode: d.equipmentCode, hospitalId: hospital._id });
    if (!doc) {
      doc = await Equipment.create({ ...d, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Equipment: ${d.name}`);
    }
    equipmentDocs.push(doc);
  }

  // 6. Seed Maintenance Logs
  const maintenanceData = [
    { equipmentId: equipmentDocs[0]._id, maintenanceType: 'Preventive', description: 'Monthly checkup', cost: 5000, performedBy: 'Service Tech', completionDate: new Date(), status: 'completed' },
    { equipmentId: equipmentDocs[2]._id, maintenanceType: 'Repair', description: 'Gasket replacement', cost: 2000, performedBy: 'In-house Bio-med', completionDate: new Date(), status: 'completed' },
  ];
  for (const d of maintenanceData) {
    const exists = await MaintenanceLog.findOne({ equipmentId: d.equipmentId, description: d.description });
    if (!exists) {
      await MaintenanceLog.create({ ...d, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Maintenance Log for ${d.equipmentId}`);
    }
  }

  console.log('CSSD & Core Seeding completed!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
