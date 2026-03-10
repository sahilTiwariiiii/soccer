import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { ConnectDb } from '../db/database.js';
import User from '../models/User.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import generateUniqueEmployeeId from '../services/generateemployeeid.service.js';

dotenv.config();

async function ensureUser({ name, email, phone, role, password, hospitalId, branchId }) {
  const exists = await User.findOne({ email });
  if (exists) {
    if (!exists.hospitalId || !exists.branchId) {
      exists.hospitalId = hospitalId;
      exists.branchId = branchId;
      await exists.save();
      console.log(`Updated user: ${name} with missing IDs`);
    }
    return exists;
  }
  const employee_id = await generateUniqueEmployeeId();
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    employee_id,
    name,
    email,
    phone,
    role,
    password: hashed,
    hospitalId,
    branchId
  });
  console.log(`Created user: ${name} (${role})`);
  return user;
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

  const defaults = [
    { name: 'Admin One', email: 'admin1@hms.local', phone: '9000000001', role: 'admin', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id },
    { name: 'Reception One', email: 'reception1@hms.local', phone: '9000000002', role: 'receptionist', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id },
    { name: 'Doctor OPD', email: 'doctor.opd@hms.local', phone: '9000000003', role: 'doctor', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id },
    { name: 'Nurse One', email: 'nurse1@hms.local', phone: '9000000004', role: 'nurse', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id },
    { name: 'Lab Tech One', email: 'labtech1@hms.local', phone: '9000000005', role: 'lab_technician', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id },
    { name: 'Dr. Test', email: 'dr.test@hms.local', phone: '9000000006', role: 'doctor', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id },
  ];
  for (const u of defaults) {
    await ensureUser(u);
  }
  console.log('User seeding completed.');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
