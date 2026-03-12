
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  // Add your patient schema here
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
