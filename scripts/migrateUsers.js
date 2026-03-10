import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import User from '../models/User.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import mongoose from 'mongoose';

dotenv.config();

async function migrate() {
  try {
    await ConnectDb();
    console.log('Connected to Database');

    // Find first hospital
    const hospital = await Hospital.findOne();
    if (!hospital) {
      console.error('No hospital found! Please run infrastructure seeder first.');
      process.exit(1);
    }
    console.log(`Found Hospital: ${hospital.name} (${hospital._id})`);

    // Find first branch
    const branch = await Branch.findOne({ hospitalId: hospital._id });
    if (!branch) {
      console.error('No branch found for this hospital! Please run infrastructure seeder first.');
      process.exit(1);
    }
    console.log(`Found Branch: ${branch.name} (${branch._id})`);

    // Update all users missing hospitalId or branchId
    const result = await User.updateMany(
      { 
        $or: [
          { hospitalId: { $exists: false } }, 
          { branchId: { $exists: false } },
          { hospitalId: null },
          { branchId: null }
        ] 
      },
      { 
        $set: { 
          hospitalId: hospital._id, 
          branchId: branch._id 
        } 
      }
    );

    console.log(`Migration complete. Updated ${result.modifiedCount} users.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
