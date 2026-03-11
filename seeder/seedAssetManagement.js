import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import Department from '../models/Department.js';
import User from '../models/User.js';
import AssetCategory from '../models/assetmanagement/AssetCategory.js';
import AssetVendor from '../models/assetmanagement/AssetVendor.js';
import AssetLocation from '../models/assetmanagement/AssetLocation.js';
import AssetMaster from '../models/assetmanagement/AssetMaster.js';
import AssetMaintenance from '../models/assetmanagement/AssetMaintenance.js';
import AssetDepreciation from '../models/assetmanagement/AssetDepreciation.js';
import AssetDisposal from '../models/assetmanagement/AssetDisposal.js';

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

  // 1. Create Asset Categories
  const categoriesData = [
    { name: 'Medical Equipment', description: 'General medical devices' },
    { name: 'Radiology', description: 'Imaging and X-ray equipment' },
    { name: 'Laboratory', description: 'Testing and analysis instruments' },
    { name: 'Cardiology', description: 'Heart related equipment' },
    { name: 'CSSD', description: 'Sterilization equipment' },
    { name: 'Emergency', description: 'Life support and emergency gear' },
    { name: 'IT Equipment', description: 'Computers and networking' },
    { name: 'Furniture', description: 'Hospital furniture' }
  ];

  const categoryDocs = [];
  for (const cat of categoriesData) {
    let doc = await AssetCategory.findOne({ name: cat.name, hospital_id: hospital._id });
    if (!doc) {
      doc = await AssetCategory.create({ ...cat, hospital_id: hospital._id, branch_id: branch._id });
      console.log(`Created Asset Category: ${cat.name}`);
    }
    categoryDocs.push(doc);
  }

  // 2. Create Asset Vendors
  const vendorsData = [
    { name: 'Philips Healthcare', contact_person: 'Mr. Sharma', email: 'sharma@philips.com', phone: '9876543210' },
    { name: 'Siemens Healthineers', contact_person: 'Ms. Gupta', email: 'gupta@siemens.com', phone: '8765432109' },
    { name: 'BioMed Solutions', contact_person: 'Mr. Singh', email: 'singh@biomed.com', phone: '7654321098' },
    { name: 'MedTech Services', contact_person: 'Mr. Patel', email: 'patel@medtech.com', phone: '6543210987' }
  ];

  const vendorDocs = [];
  for (const v of vendorsData) {
    let doc = await AssetVendor.findOne({ name: v.name, hospital_id: hospital._id });
    if (!doc) {
      doc = await AssetVendor.create({ ...v, hospital_id: hospital._id, branch_id: branch._id });
      console.log(`Created Asset Vendor: ${v.name}`);
    }
    vendorDocs.push(doc);
  }

  // 3. Create Asset Locations
  const locationsData = [
    { building: 'Main Block', floor: '1st Floor', description: 'ICU-1' },
    { building: 'Diagnostic Block', floor: 'Ground Floor', description: 'Radiology Dept' },
    { building: 'Diagnostic Block', floor: 'Ground Floor', description: 'CT Room' },
    { building: 'Main Block', floor: 'Ground Floor', description: 'Emergency Dept' },
    { building: 'Main Block', floor: '2nd Floor', description: 'CSSD' }
  ];

  const locationDocs = [];
  for (const loc of locationsData) {
    let doc = await AssetLocation.findOne({ description: loc.description, hospital_id: hospital._id });
    if (!doc) {
      doc = await AssetLocation.create({ ...loc, hospital_id: hospital._id, branch_id: branch._id });
      console.log(`Created Asset Location: ${loc.description}`);
    }
    locationDocs.push(doc);
  }

  // 4. Create Asset Masters
  const assetsData = [
    {
      asset_name: 'Ventilator V500',
      asset_code: 'AST-001',
      brand: 'Dräger',
      model: 'V500',
      serial_number: 'SN12345',
      purchase_date: new Date('2023-01-15'),
      purchase_cost: 1250000,
      status: 'available',
      category_id: categoryDocs.find(c => c.name === 'Medical Equipment')?._id,
      vendor_id: vendorDocs.find(v => v.name === 'Philips Healthcare')?._id,
      location_id: locationDocs.find(l => l.description === 'ICU-1')?._id,
      department_id: departments.find(d => d.name === 'IPD')?._id,
      warranty_expiry: new Date('2026-01-15'),
      depreciation_method: 'SLM',
      depreciation_rate: 15
    },
    {
      asset_name: 'X-Ray Machine DR',
      asset_code: 'AST-002',
      brand: 'Philips',
      model: 'Digital Pro',
      serial_number: 'SN67890',
      purchase_date: new Date('2022-06-20'),
      purchase_cost: 4500000,
      status: 'available',
      category_id: categoryDocs.find(c => c.name === 'Radiology')?._id,
      vendor_id: vendorDocs.find(v => v.name === 'Siemens Healthineers')?._id,
      location_id: locationDocs.find(l => l.description === 'Radiology Dept')?._id,
      department_id: departments.find(d => d.name === 'Radiology')?._id,
      warranty_expiry: new Date('2025-06-20'),
      depreciation_method: 'SLM',
      depreciation_rate: 10
    },
    {
      asset_name: 'CT Scanner 128-Slice',
      asset_code: 'AST-003',
      brand: 'Siemens',
      model: 'Somatom',
      serial_number: 'SN11223',
      purchase_date: new Date('2021-03-10'),
      purchase_cost: 25000000,
      status: 'available',
      category_id: categoryDocs.find(c => c.name === 'Radiology')?._id,
      vendor_id: vendorDocs.find(v => v.name === 'Siemens Healthineers')?._id,
      location_id: locationDocs.find(l => l.description === 'CT Room')?._id,
      department_id: departments.find(d => d.name === 'Radiology')?._id,
      warranty_expiry: new Date('2026-03-10'),
      depreciation_method: 'SLM',
      depreciation_rate: 10
    }
  ];

  const assetDocs = [];
  for (const asset of assetsData) {
    let doc = await AssetMaster.findOne({ asset_code: asset.asset_code, hospital_id: hospital._id });
    if (!doc) {
      doc = await AssetMaster.create({ ...asset, hospital_id: hospital._id, branch_id: branch._id });
      console.log(`Created Asset Master: ${asset.asset_name}`);
    }
    assetDocs.push(doc);
  }

  // 5. Create Maintenance Records
  const maintenanceData = [
    {
      asset_id: assetDocs[0]?._id,
      maintenance_type: 'preventive',
      technician_name: 'BioMed Solutions',
      vendor_id: vendorDocs.find(v => v.name === 'BioMed Solutions')?._id,
      maintenance_date: new Date('2024-03-15'),
      cost: 15000,
      next_maintenance_date: new Date('2024-06-15'),
      status: 'completed',
      description: 'Regular checkup'
    }
  ];

  for (const mnt of maintenanceData) {
    if (mnt.asset_id) {
        await AssetMaintenance.create({ ...mnt, hospital_id: hospital._id, branch_id: branch._id });
        console.log(`Created Maintenance record for asset: ${mnt.asset_id}`);
    }
  }

  // 6. Create Depreciation Records
  const depreciationData = [
    {
      asset_id: assetDocs[0]?._id,
      depreciation_amount: 208333,
      depreciation_date: new Date('2024-03-01'),
      book_value: 1041667
    }
  ];

  for (const dep of depreciationData) {
    if (dep.asset_id) {
        await AssetDepreciation.create({ ...dep, hospital_id: hospital._id, branch_id: branch._id });
        console.log(`Created Depreciation record for asset: ${dep.asset_id}`);
    }
  }

  // 7. Create Disposal Records
  const disposalData = [
    {
      asset_id: assetDocs[1]?._id,
      disposal_type: 'scrapped',
      disposal_date: new Date('2024-02-15'),
      disposal_amount: 50000,
      remarks: 'Old and non-functional'
    }
  ];

  for (const disp of disposalData) {
    if (disp.asset_id) {
        await AssetDisposal.create({ ...disp, hospital_id: hospital._id, branch_id: branch._id });
        console.log(`Created Disposal record for asset: ${disp.asset_id}`);
    }
  }

  console.log('Seeding completed!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
