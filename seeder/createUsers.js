import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { ConnectDb } from '../db/database.js';
import User from '../models/User.js';
import generateUniqueEmployeeId from '../services/generateemployeeid.service.js';

dotenv.config();

async function ensureUser({ name, email, phone, role, password }) {
  const exists = await User.findOne({ email });
  if (exists) return exists;
  const employee_id = await generateUniqueEmployeeId();
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    employee_id,
    name,
    email,
    phone,
    role,
    password: hashed,
  });
  console.log(`Created user: ${name} (${role})`);
  return user;
}

async function run() {
  await ConnectDb();
  const defaults = [
    { name: 'Admin One', email: 'admin1@hms.local', phone: '9000000001', role: 'admin', password: 'Password@123' },
    { name: 'Reception One', email: 'reception1@hms.local', phone: '9000000002', role: 'receptionist', password: 'Password@123' },
    { name: 'Doctor OPD', email: 'doctor.opd@hms.local', phone: '9000000003', role: 'doctor', password: 'Password@123' },
    { name: 'Nurse One', email: 'nurse1@hms.local', phone: '9000000004', role: 'nurse', password: 'Password@123' },
    { name: 'Lab Tech One', email: 'labtech1@hms.local', phone: '9000000005', role: 'lab_technician', password: 'Password@123' },
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
