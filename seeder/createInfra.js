import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Department from '../models/Department.js';
import Branch from '../models/branches/BranchSchema.js';
import Floor from '../models/branches/FloorSchema.js';
import Room from '../models/branches/RoomSchema.js';

dotenv.config();

async function ensureHospital() {
  let hospital = await Hospital.findOne({ name: 'Samrat Hospital' });
  if (!hospital) {
    hospital = await Hospital.create({
      name: 'Samrat Hospital',
      legalName: 'Samrat Healthcare Pvt Ltd',
      registrationNumber: 'REG-123456',
      address: { line1: 'Main Road', city: 'City', state: 'State', pincode: '400000', country: 'India' },
      contactNumber: '8000000000',
      email: 'info@samrat-hospital.local',
      website: 'https://samrat-hospital.local',
    });
    console.log('Created hospital');
  }
  return hospital;
}

async function ensureDepartments() {
  const names = ['OPD', 'IPD', 'Radiology', 'Laboratory', 'Pharmacy'];
  const out = [];
  for (const n of names) {
    let dep = await Department.findOne({ name: n });
    if (!dep) {
      dep = await Department.create({ name: n, description: `${n} Department` });
      console.log(`Created department: ${n}`);
    }
    out.push(dep);
  }
  return out;
}

async function ensureBranch(hospitalId) {
  let branch = await Branch.findOne({ branchCode: 'MB001' });
  if (!branch) {
    branch = await Branch.create({
      hospitalId,
      name: 'Main Branch',
      branchCode: 'MB001',
      branchType: 'General',
      contactNumber: '8100000000',
      email: 'main.branch@samrat-hospital.local',
      totalFloors: 3,
      totalRooms: 10,
      isActive: true,
      isVerified: true,
    });
    console.log('Created branch: Main Branch');
  }
  return branch;
}

async function ensureFloors(hospitalId, branchId) {
  const defs = [
    { floorName: 'Ground OPD', floorNumber: 0, floorType: 'OPD' },
    { floorName: 'First Ward', floorNumber: 1, floorType: 'Ward' },
    { floorName: 'Diagnostics', floorNumber: 2, floorType: 'Diagnostics' },
  ];
  const out = [];
  for (const f of defs) {
    let floor = await Floor.findOne({ branchId, floorNumber: f.floorNumber });
    if (!floor) {
      floor = await Floor.create({ hospitalId, branchId, ...f, totalRooms: 0, isActive: true });
      console.log(`Created floor: ${f.floorName}`);
    }
    out.push(floor);
  }
  return out;
}

async function ensureRooms(hospitalId, branchId, floors, departments) {
  const opdDept = departments.find(d => d.name === 'OPD');
  const groundFloor = floors.find(f => f.floorNumber === 0);
  const defs = [
    { roomNumber: 'OPD-101', roomName: 'Consultation 1', roomType: 'Consultation', departmentId: opdDept?._id, floorId: groundFloor?._id },
    { roomNumber: 'OPD-102', roomName: 'Consultation 2', roomType: 'Consultation', departmentId: opdDept?._id, floorId: groundFloor?._id },
    { roomNumber: 'OPD-103', roomName: 'Consultation 3', roomType: 'Consultation', departmentId: opdDept?._id, floorId: groundFloor?._id },
  ];
  for (const r of defs) {
    const exists = await Room.findOne({ branchId, roomNumber: r.roomNumber });
    if (!exists) {
      await Room.create({ hospitalId, branchId, ...r, capacity: 1, status: 'Available' });
      console.log(`Created room: ${r.roomNumber}`);
    }
  }
}

async function run() {
  await ConnectDb();
  const hospital = await ensureHospital();
  const departments = await ensureDepartments();
  const branch = await ensureBranch(hospital._id);
  const floors = await ensureFloors(hospital._id, branch._id);
  await ensureRooms(hospital._id, branch._id, floors, departments);
  console.log('Infrastructure seeding completed.');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
