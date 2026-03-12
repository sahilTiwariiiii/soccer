import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import GlobalVisit from '../models/vitals/GlobalVitals.js';
import VisitVitals from '../models/vitals/VisitVitals.js';
import Department from '../models/Department.js';
import PatientVisit from '../models/PatientVisitSchema.js';
import User from '../models/User.js';

dotenv.config();

async function run() {
  await ConnectDb();

  const user = await User.findOne();
  const department = await Department.findOne();
  const visit = await PatientVisit.findOne();

  if (!user || !department || !visit) {
    console.error('Required infrastructure (User, Department, Visit) not found.');
    process.exit(1);
  }

  console.log('--- Seeding Vitals Module ---');

  // 1. Seed Global Vitals
  const globalVitalsData = [
    { name: 'Blood Pressure (Systolic)', unit: 'mmHg', dataType: 'number', normalMin: 90, normalMax: 120 },
    { name: 'Blood Pressure (Diastolic)', unit: 'mmHg', dataType: 'number', normalMin: 60, normalMax: 80 },
    { name: 'Heart Rate', unit: 'bpm', dataType: 'number', normalMin: 60, normalMax: 100 },
    { name: 'Temperature', unit: '°F', dataType: 'number', normalMin: 97, normalMax: 99 },
    { name: 'Respiratory Rate', unit: 'breaths/min', dataType: 'number', normalMin: 12, normalMax: 20 },
    { name: 'Oxygen Saturation (SpO2)', unit: '%', dataType: 'number', normalMin: 95, normalMax: 100 },
  ];

  for (const v of globalVitalsData) {
    let doc = await GlobalVisit.findOne({ name: v.name });
    if (!doc) {
      await GlobalVisit.create({ ...v, departmentId: null });
      console.log(`Created Global Vital: ${v.name}`);
    }
  }

  // 2. Seed Visit Vitals
  const visitVitalsExists = await VisitVitals.findOne({ visitId: visit._id });
  if (!visitVitalsExists) {
    await VisitVitals.create({
      visitId: visit._id,
      departmentId: department._id,
      recordedBy: user._id,
      vitals: {
        'Blood Pressure (Systolic)': 118,
        'Blood Pressure (Diastolic)': 76,
        'Heart Rate': 72,
        'Temperature': 98.6,
        'Respiratory Rate': 16,
        'Oxygen Saturation (SpO2)': 98,
      }
    });
    console.log(`Created Visit Vitals for Visit: ${visit._id}`);
  }

  console.log('Vitals Seeding completed!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
