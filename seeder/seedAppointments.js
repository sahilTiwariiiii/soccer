import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import User from '../models/User.js';
import Patient from '../models/PatientRegistration.js';
import Appointment from '../models/appointmentandscheduling/AppointmentSchema.js';
import DoctorAvailability from '../models/appointmentandscheduling/DoctorAvailability.js';

dotenv.config();

async function run() {
  await ConnectDb();

  const hospital = await Hospital.findOne();
  const branch = await Branch.findOne();
  const admin = await User.findOne(); // For createdBy fields
  const doctor = await User.findOne({ hospitalId: hospital._id }) || admin;
  const patient = await Patient.findOne();

  if (!hospital || !branch || !admin || !patient) {
    console.error('Required infrastructure (Hospital, Branch, User, Patient) not found.');
    process.exit(1);
  }

  console.log('--- Seeding Appointment Module ---');

  // 1. Create Doctor Availability
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  for (const day of days) {
    const exists = await DoctorAvailability.findOne({
      doctorId: doctor._id,
      dayOfWeek: day,
      hospitalId: hospital._id
    });

    if (!exists) {
      await DoctorAvailability.create({
        hospitalId: hospital._id,
        branchId: branch._id,
        doctorId: doctor._id,
        dayOfWeek: day,
        startTime: '09:00',
        endTime: '17:00',
        slotDuration: 30,
        isActive: true
      });
      console.log(`Created availability for ${doctor.name} on ${day}`);
    }
  }

  // 2. Create Appointment Records
  const appointmentData = [
    {
      appointmentDate: new Date(),
      startTime: '10:00',
      endTime: '10:30',
      consultationType: 'OPD',
      status: 'Confirmed',
      reason: 'Regular checkup',
      notes: 'Patient reported mild headache'
    },
    {
      appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      startTime: '11:00',
      endTime: '11:30',
      consultationType: 'FollowUp',
      status: 'Booked',
      reason: 'Review test results',
      notes: 'Blood report pending'
    },
    {
      appointmentDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      startTime: '14:00',
      endTime: '14:30',
      consultationType: 'Emergency',
      status: 'Completed',
      reason: 'Acute stomach pain',
      notes: 'Prescribed antacids'
    }
  ];

  for (const apt of appointmentData) {
    const aptNumber = `APT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Check if appointment already exists for this patient on this date/time
    const exists = await Appointment.findOne({
      patientId: patient._id,
      appointmentDate: apt.appointmentDate,
      startTime: apt.startTime
    });

    if (!exists) {
      await Appointment.create({
        ...apt,
        hospitalId: hospital._id,
        branchId: branch._id,
        appointmentNumber: aptNumber,
        patientId: patient._id,
        doctorId: doctor._id,
        bookedBy: admin._id
      });
      console.log(`Created Appointment: ${aptNumber} for ${patient.patientName}`);
    }
  }

  console.log('Appointment Seeding completed!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
