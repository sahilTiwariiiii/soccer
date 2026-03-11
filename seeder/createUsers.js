import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { ConnectDb } from '../db/database.js';
import User from '../models/User.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import Department from '../models/Department.js';
import Role from '../models/Role.js';
import generateUniqueEmployeeId from '../services/generateemployeeid.service.js';

dotenv.config();

async function ensureRole(name, hospitalId, branchId) {
  let role = await Role.findOne({ name, hospitalId, branchId });
  if (!role) {
    role = await Role.create({ name, hospitalId, branchId });
    console.log(`Created role: ${name}`);
  }
  return role;
}

async function ensureUser({ name, email, phone, role, password, hospitalId, branchId, department_id, documents }) {
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
    branchId,
    department_id,
    documents
  });
  console.log(`Created user: ${name} (${role.name})`);
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
  const department = await Department.findOne({ name: 'OPD' });
  if (!department) {
    console.error('No OPD department found! Run createInfra.js first.');
    process.exit(1);
  }

  const roles = [
    'admin', 'receptionist', 'doctor', 'nurse', 'lab_technician', 'surgeon', 'anesthesiologist', 'radiologist', 'pathologist', 'pharmacist', 'therapist', 'dietitian', 'medical_assistant', 'accountant', 'hr_manager', 'billing_clerk', 'inventory_manager', 'it_support', 'janitor', 'security_guard', 'ambulance_driver'
  ];

  for (const roleName of roles) {
    await ensureRole(roleName, hospital._id, branch._id);
  }

  const defaults = [
    { name: 'Admin One', email: 'admin1@hms.local', phone: '9000000001', role: 'admin', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Reception One', email: 'reception1@hms.local', phone: '9000000002', role: 'receptionist', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Doctor OPD', email: 'doctor.opd@hms.local', phone: '9000000003', role: 'doctor', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id, documents: [{document_id: "1234", type: "Aadhar", value: "1234-5678-9012"}, {document_id: "5678", type: "PAN", value: "ABCDE1234F"}] },
    { name: 'Nurse One', email: 'nurse1@hms.local', phone: '9000000004', role: 'nurse', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Lab Tech One', email: 'labtech1@hms.local', phone: '9000000005', role: 'lab_technician', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Dr. Test', email: 'dr.test@hms.local', phone: '9000000006', role: 'doctor', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Surgeon One', email: 'surgeon1@hms.local', phone: '9000000007', role: 'surgeon', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Anesthesiologist One', email: 'anesthesiologist1@hms.local', phone: '9000000008', role: 'anesthesiologist', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Radiologist One', email: 'radiologist1@hms.local', phone: '9000000009', role: 'radiologist', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Pathologist One', email: 'pathologist1@hms.local', phone: '9000000010', role: 'pathologist', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Pharmacist One', email: 'pharmacist1@hms.local', phone: '9000000011', role: 'pharmacist', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Therapist One', email: 'therapist1@hms.local', phone: '9000000012', role: 'therapist', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Dietitian One', email: 'dietitian1@hms.local', phone: '9000000013', role: 'dietitian', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Medical Assistant One', email: 'medicalassistant1@hms.local', phone: '9000000014', role: 'medical_assistant', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Accountant One', email: 'accountant1@hms.local', phone: '9000000015', role: 'accountant', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'HR Manager One', email: 'hrmanager1@hms.local', phone: '9000000016', role: 'hr_manager', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Billing Clerk One', email: 'billingclerk1@hms.local', phone: '9000000017', role: 'billing_clerk', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Inventory Manager One', email: 'inventorymanager1@hms.local', phone: '9000000018', role: 'inventory_manager', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'IT Support One', email: 'itsupport1@hms.local', phone: '9000000019', role: 'it_support', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Janitor One', email: 'janitor1@hms.local', phone: '9000000020', role: 'janitor', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Security Guard One', email: 'securityguard1@hms.local', phone: '9000000021', role: 'security_guard', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
    { name: 'Ambulance Driver One', email: 'ambulancedriver1@hms.local', phone: '9000000022', role: 'ambulance_driver', password: 'Password@123', hospitalId: hospital._id, branchId: branch._id, department_id: department._id },
  ];
  for (const u of defaults) {
    const role = await Role.findOne({ name: u.role, hospitalId: u.hospitalId, branchId: u.branchId });
    if (role) {
      u.role = role._id;
      await ensureUser(u);
    }
  }
  console.log('User seeding completed.');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
