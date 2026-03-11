import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import Department from '../models/Department.js';
import User from '../models/User.js';
import EquipmentCategory from '../models/equipmentmanagement/EquipmentCategorySchema.js';
import Equipment from '../models/equipmentmanagement/EquipmentSchema.js';
import Vendor from '../models/assetmanagement/AssetVendor.js';
import Location from '../models/assetmanagement/AssetLocation.js';
import MaintenanceSchedule from '../models/equipmentmanagement/MaintenanceScheduleSchema.js';
import MaintenanceLog from '../models/equipmentmanagement/MaintenanceLogSchema.js';
import CalibrationRecord from '../models/equipmentmanagement/CalibrationRecordSchema.js';

dotenv.config();

async function run() {
  await ConnectDb();

  const hospital = await Hospital.findOne();
  const branch = await Branch.findOne();
  const departments = await Department.find();
  const user = await User.findOne();

  if (!hospital || !branch) {
    console.error('Hospital or Branch not found. Run createInfra.js first.');
    process.exit(1);
  }

  // 1. Create Equipment Categories
  const categoriesData = [
    { name: 'Imaging', description: 'MRI, CT, X-Ray' },
    { name: 'Life Support', description: 'Ventilators, Defibrillators' },
    { name: 'Monitoring', description: 'Patient Monitors, ECG' },
    { name: 'Laboratory', description: 'Analyzers, Centrifuges' }
  ];

  const categoryDocs = [];
  for (const cat of categoriesData) {
    let doc = await EquipmentCategory.findOne({ name: cat.name, hospitalId: hospital._id });
    if (!doc) {
      doc = await EquipmentCategory.create({ ...cat, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Equipment Category: ${cat.name}`);
    }
    categoryDocs.push(doc);
  }

  // 2. Use existing vendors and locations (from Asset Management)
  const vendors = await Vendor.find({ hospital_id: hospital._id });
  const locations = await Location.find({ hospital_id: hospital._id });

  if (vendors.length === 0 || locations.length === 0) {
    console.error('Vendors or Locations not found. Run seedAssetManagement.js first.');
    process.exit(1);
  }

  // 3. Create Equipment
  const equipmentsData = [
    {
      name: 'MRI Scanner 3T',
      equipmentCode: 'EQ-MRI-001',
      brand: 'GE Healthcare',
      model: 'Signa Pioneer',
      serialNumber: 'SN-MRI-9988',
      categoryId: categoryDocs.find(c => c.name === 'Imaging')?._id,
      vendorId: vendors[0]._id,
      departmentId: departments.find(d => d.name === 'Radiology')?._id,
      locationId: locations.find(l => l.description === 'Radiology Dept')?._id,
      status: 'active',
      purchaseDate: new Date('2022-01-10'),
      purchaseCost: 85000000
    },
    {
      name: 'Advanced Patient Monitor',
      equipmentCode: 'EQ-PM-005',
      brand: 'Mindray',
      model: 'BeneVision N22',
      serialNumber: 'SN-PM-5544',
      categoryId: categoryDocs.find(c => c.name === 'Monitoring')?._id,
      vendorId: vendors[1]._id,
      departmentId: departments.find(d => d.name === 'IPD')?._id,
      locationId: locations.find(l => l.description === 'ICU-1')?._id,
      status: 'active',
      purchaseDate: new Date('2023-05-15'),
      purchaseCost: 1500000
    }
  ];

  const equipmentDocs = [];
  for (const eq of equipmentsData) {
    let doc = await Equipment.findOne({ equipmentCode: eq.equipmentCode, hospitalId: hospital._id });
    if (!doc) {
      doc = await Equipment.create({ ...eq, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Equipment: ${eq.name}`);
    }
    equipmentDocs.push(doc);
  }

  // 4. Create Maintenance Schedules
  if (equipmentDocs.length > 0) {
    const schedulesData = [
      {
        equipmentId: equipmentDocs[0]._id,
        maintenanceType: 'preventive',
        frequency: 'quarterly',
        lastMaintenanceDate: new Date('2024-01-15'),
        nextMaintenanceDate: new Date('2024-04-15'),
        vendorId: vendors[0]._id,
        status: 'scheduled'
      }
    ];

    for (const sch of schedulesData) {
        await MaintenanceSchedule.create({ ...sch, hospitalId: hospital._id, branchId: branch._id });
        console.log(`Created Maintenance Schedule for: ${equipmentDocs[0].name}`);
    }

    // 5. Create Maintenance Logs
    const logsData = [
      {
        equipmentId: equipmentDocs[0]._id,
        maintenanceDate: new Date('2024-01-15'),
        engineerName: 'Mr. John Doe',
        vendorId: vendors[0]._id,
        description: 'Routine quarterly checkup and software update.',
        cost: 25000
      }
    ];

    for (const log of logsData) {
        await MaintenanceLog.create({ ...log, hospitalId: hospital._id, branchId: branch._id });
        console.log(`Created Maintenance Log for: ${equipmentDocs[0].name}`);
    }

    // 6. Create Calibration Records
    const calibrationData = [
      {
        equipmentId: equipmentDocs[1]._id,
        calibrationDate: new Date('2024-02-10'),
        nextCalibrationDate: new Date('2025-02-10'),
        performedBy: 'Biomedical Team',
        certificateNumber: 'CAL-2024-001'
      }
    ];

    for (const cal of calibrationData) {
        await CalibrationRecord.create({ ...cal, hospitalId: hospital._id, branchId: branch._id });
        console.log(`Created Calibration Record for: ${equipmentDocs[1].name}`);
    }
  }

  console.log('Equipment Seeding completed!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
