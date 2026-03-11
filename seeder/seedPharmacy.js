import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import User from '../models/User.js';
import Patient from '../models/PatientRegistration.js';
import MedicineMaster from '../models/pharmacy/MedicineMaster.js';
import Supplier from '../models/pharmacy/SupplierSchema.js';
import Pharmacy from '../models/pharmacy/Pharmacy.js';
import PharmacyStock from '../models/pharmacy/PharmacyStockBatchWise.js';
import PharmacyDispense from '../models/pharmacy/PharmacyDispenseRecord.js';
import PharmacyInvoice from '../models/pharmacy/PharmacyInvoice.js';

dotenv.config();

async function run() {
  await ConnectDb();

  const hospital = await Hospital.findOne();
  const branch = await Branch.findOne();
  const user = await User.findOne();
  const patient = await Patient.findOne();

  if (!hospital || !branch) {
    console.error('Hospital or Branch not found. Run createInfra.js first.');
    process.exit(1);
  }

  // 1. Create Pharmacy
  let pharmacy = await Pharmacy.findOne({ branchId: branch._id });
  if (!pharmacy) {
    pharmacy = await Pharmacy.create({
      branchId: branch._id,
      name: 'Main Pharmacy',
      pharmacyLicenseNumber: 'PH-LIC-12345',
      drugLicenseValidTill: new Date('2030-12-31'),
      pharmacistInCharge: {
        name: 'Ankit Gupta',
        registrationNumber: 'REG-9988',
        contactNumber: '9876543210'
      }
    });
    console.log('Created Pharmacy');
  }

  // 2. Create Suppliers
  const suppliersData = [
    { supplierName: 'Cipla Ltd', contactPerson: 'Mr. Rajesh', phone: '9876543210', email: 'sales@cipla.com' },
    { supplierName: 'Sun Pharma', contactPerson: 'Mr. Amit', phone: '9876543211', email: 'sales@sunpharma.com' }
  ];

  const supplierDocs = [];
  for (const s of suppliersData) {
    let doc = await Supplier.findOne({ supplierName: s.supplierName, hospitalId: hospital._id });
    if (!doc) {
      doc = await Supplier.create({ ...s, hospitalId: hospital._id, branchId: branch._id, createdBy: user._id });
      console.log(`Created Supplier: ${s.supplierName}`);
    }
    supplierDocs.push(doc);
  }

  // 3. Create Medicine Master
  const medicinesData = [
    { name: 'Paracetamol 500mg', category: 'Analgesic', scheduleType: 'OTC', form: 'Tablet', strength: '500mg' },
    { name: 'Amoxicillin 250mg', category: 'Antibiotic', scheduleType: 'ScheduleH', form: 'Capsule', strength: '250mg' },
    { name: 'Metformin 500mg', category: 'Anti-diabetic', scheduleType: 'ScheduleH', form: 'Tablet', strength: '500mg' }
  ];

  const medicineDocs = [];
  for (const m of medicinesData) {
    let doc = await MedicineMaster.findOne({ name: m.name, hospitalId: hospital._id });
    if (!doc) {
      doc = await MedicineMaster.create({ ...m, hospitalId: hospital._id, createdBy: user._id });
      console.log(`Created Medicine: ${m.name}`);
    }
    medicineDocs.push(doc);
  }

  // 4. Create Pharmacy Stock
  const stocksData = [
    {
      medicineId: medicineDocs[0]._id,
      batchNumber: 'B-2026-A01',
      expiryDate: new Date('2027-12-15'),
      availableQuantity: 1200,
      purchasePrice: 1.8,
      sellingPrice: 2.5,
      supplierId: supplierDocs[0]._id,
      status: 'Available'
    },
    {
      medicineId: medicineDocs[1]._id,
      batchNumber: 'B-2026-A02',
      expiryDate: new Date('2026-04-15'),
      availableQuantity: 8,
      purchasePrice: 8,
      sellingPrice: 12,
      supplierId: supplierDocs[1]._id,
      status: 'Available'
    }
  ];

  const stockDocs = [];
  for (const s of stocksData) {
    let doc = await PharmacyStock.findOne({ medicineId: s.medicineId, batchNumber: s.batchNumber, pharmacyId: pharmacy._id });
    if (!doc) {
      doc = await PharmacyStock.create({ ...s, hospitalId: hospital._id, branchId: branch._id, pharmacyId: pharmacy._id });
      console.log(`Created Stock for: ${s.batchNumber}`);
    }
    stockDocs.push(doc);
  }

  // 5. Create Invoices (if patient exists)
  if (patient) {
    const invoice = await PharmacyInvoice.create({
      hospitalId: hospital._id,
      branchId: branch._id,
      patientId: patient._id,
      invoiceNumber: 'INV-PH-001',
      totalAmount: 500,
      discount: 50,
      taxAmount: 54,
      netAmount: 504,
      paymentStatus: 'Paid',
      createdBy: user._id
    });
    console.log(`Created Invoice for: ${patient.patientName}`);
  }

  console.log('Pharmacy Seeding completed!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
