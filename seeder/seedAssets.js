import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import Department from '../models/Department.js';
import Equipment from '../models/equipmentmanagement/EquipmentSchema.js';
import EquipmentCategory from '../models/equipmentmanagement/EquipmentCategorySchema.js';
import Vendor from '../models/equipmentmanagement/VendorSchema.js';
import Location from '../models/equipmentmanagement/LocationSchema.js';

dotenv.config();

async function run() {
  await ConnectDb();

  const hospital = await Hospital.findOne();
  const branch = await Branch.findOne();
  const departments = await Department.find();

  if (!hospital || !branch) {
    console.error('Hospital or Branch not found. Run createInfra.js first.');
    process.exit(1);
  }

  // 1. Create Categories
  const categories = [
    { name: 'Medical Equipment', description: 'General medical devices' },
    { name: 'Radiology', description: 'Imaging and X-ray equipment' },
    { name: 'Laboratory', description: 'Testing and analysis instruments' },
    { name: 'Emergency', description: 'Life support and emergency gear' }
  ];

  const categoryDocs = [];
  for (const cat of categories) {
    let doc = await EquipmentCategory.findOne({ name: cat.name, hospitalId: hospital._id });
    if (!doc) {
      doc = await EquipmentCategory.create({ ...cat, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Category: ${cat.name}`);
    }
    categoryDocs.push(doc);
  }

  // 2. Create Vendors
  const vendors = [
    { name: 'Philips Healthcare', contactPerson: 'Mr. Sharma', email: 'sharma@philips.com', phone: '9876543210' },
    { name: 'Siemens Healthineers', contactPerson: 'Ms. Gupta', email: 'gupta@siemens.com', phone: '8765432109' },
    { name: 'BioMed Solutions', contactPerson: 'Mr. Singh', email: 'singh@biomed.com', phone: '7654321098' }
  ];

  const vendorDocs = [];
  for (const v of vendors) {
    let doc = await Vendor.findOne({ name: v.name, hospitalId: hospital._id });
    if (!doc) {
      doc = await Vendor.create({ ...v, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Vendor: ${v.name}`);
    }
    vendorDocs.push(doc);
  }

  // 3. Create Locations
  const locations = [
    { name: 'ICU-1', type: 'Ward' },
    { name: 'Radiology Dept', type: 'Department' },
    { name: 'CT Room', type: 'Room' },
    { name: 'Emergency Dept', type: 'Department' }
  ];

  const locationDocs = [];
  for (const loc of locations) {
    let doc = await Location.findOne({ name: loc.name, hospitalId: hospital._id });
    if (!doc) {
      doc = await Location.create({ ...loc, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Location: ${loc.name}`);
    }
    locationDocs.push(doc);
  }

  // 4. Create Equipment
  const equipmentList = [
    {
      name: 'Ventilator V500',
      equipmentCode: 'EQ-001',
      brand: 'Dräger',
      model: 'V500',
      serialNumber: 'SN12345',
      purchaseDate: new Date('2023-01-15'),
      purchaseCost: 1250000,
      status: 'active',
      categoryId: categoryDocs[0]._id,
      vendorId: vendorDocs[0]._id,
      locationId: locationDocs[0]._id,
      departmentId: departments.find(d => d.name === 'IPD')?._id
    },
    {
      name: 'X-Ray Machine DR',
      equipmentCode: 'EQ-002',
      brand: 'Philips',
      model: 'Digital Pro',
      serialNumber: 'SN67890',
      purchaseDate: new Date('2022-06-20'),
      purchaseCost: 4500000,
      status: 'active',
      categoryId: categoryDocs[1]._id,
      vendorId: vendorDocs[0]._id,
      locationId: locationDocs[1]._id,
      departmentId: departments.find(d => d.name === 'Radiology')?._id
    },
    {
      name: 'CT Scanner 128-Slice',
      equipmentCode: 'EQ-003',
      brand: 'Siemens',
      model: 'Somatom',
      serialNumber: 'SN54321',
      purchaseDate: new Date('2021-03-10'),
      purchaseCost: 25000000,
      status: 'active',
      categoryId: categoryDocs[1]._id,
      vendorId: vendorDocs[1]._id,
      locationId: locationDocs[2]._id,
      departmentId: departments.find(d => d.name === 'Radiology')?._id
    },
    {
      name: 'Defibrillator HeartStart',
      equipmentCode: 'EQ-004',
      brand: 'Philips',
      model: 'HS1',
      serialNumber: 'SN11223',
      purchaseDate: new Date('2023-05-22'),
      purchaseCost: 600000,
      status: 'active',
      categoryId: categoryDocs[3]._id,
      vendorId: vendorDocs[0]._id,
      locationId: locationDocs[3]._id,
      departmentId: departments.find(d => d.name === 'Emergency')?._id || departments.find(d => d.name === 'OPD')?._id
    }
  ];

  for (const eq of equipmentList) {
    const exists = await Equipment.findOne({ equipmentCode: eq.equipmentCode });
    if (!exists) {
      await Equipment.create({ ...eq, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Equipment: ${eq.name}`);
    }
  }

  console.log('Equipment seeding completed.');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
