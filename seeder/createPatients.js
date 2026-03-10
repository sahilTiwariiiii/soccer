import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import PatientRegistration from '../models/PatientRegistration.js';
import { generatepatientuhid } from '../services/generatepatientuhid.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import Country from '../models/Country.js';

dotenv.config();

async function createPatient(patientData) {
  const existingPatient = await PatientRegistration.findOne({ mobile: patientData.mobile });
  if (existingPatient) {
    console.log(`Patient with mobile ${patientData.mobile} already exists. Skipping.`);
    return;
  }
  const uhid = await generatepatientuhid();
  const patient = new PatientRegistration({ ...patientData, uhid });
  await patient.save();
  console.log(`Created patient: ${patient.patientName}`);
}

async function run() {
  await ConnectDb();

  const hospital = await Hospital.findOne();
  if (!hospital) {
    console.error('No hospital found! Run createInfra.js first.');
    process.exit(1);
  }
  const branch = await Branch.findOne({ hospitalId: hospital._id });
  if (!branch) {
    console.error('No branch found! Run createInfra.js first.');
    process.exit(1);
  }
  const country = await Country.findOne({ name: 'India' });
  if (!country) {
    console.error('Country "India" not found!');
    process.exit(1);
  }

  const patients = [
    {
      patientName: 'Rajesh Kumar',
      gender: 'Male',
      mobile: '9876543210',
      email: 'rajesh.kumar@example.com',
      address: '123, Main Street, Delhi',
      dob: '1980-01-15',
      bloodGroup: 'O+',
      country: country._id,
      hospitalId: hospital._id,
      branchId: branch._id,
    },
    {
      patientName: 'Sunita Sharma',
      gender: 'Female',
      mobile: '9876543211',
      email: 'sunita.sharma@example.com',
      address: '456, Park Avenue, Mumbai',
      dob: '1992-05-20',
      bloodGroup: 'A+',
      country: country._id,
      hospitalId: hospital._id,
      branchId: branch._id,
    },
    {
      patientName: 'Amit Singh',
      gender: 'Male',
      mobile: '9876543212',
      email: 'amit.singh@example.com',
      address: '789, Lake View Road, Bangalore',
      dob: '1988-11-30',
      bloodGroup: 'B+',
      country: country._id,
      hospitalId: hospital._id,
      branchId: branch._id,
    },
  ];

  for (const patient of patients) {
    await createPatient(patient);
  }

  console.log('Patient seeding completed.');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
