// File: seeder/injectData.js
import mongoose from "mongoose";
import Department from "../models/Department.js";
import Country from "../models/Country.js";
import State from "../models/State.js";
import City from "../models/City.js";

// Departments
const departments = [
  "General Medicine","General Surgery","Orthopedics","Gynecology & Obstetrics",
  "Pediatrics","Dermatology","ENT","Ophthalmology","Cardiology","Neurology",
  "Psychiatry","Pulmonology","Gastroenterology","Nephrology","Urology",
  "Oncology","Endocrinology","Rheumatology","Sexology","Dental",
  "Radiology","Pathology","Microbiology","Blood Bank","Emergency","ICU",
  "NICU","PICU","Trauma Care","Physiotherapy","Dietetics & Nutrition",
  "Rehabilitation","Pain Management","Operation Theatre"
];

// India States + Cities Example
const indiaStates = [
  { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
  { name: "Karnataka", cities: ["Bengaluru", "Mysore", "Mangalore"] },
  { name: "Delhi", cities: ["New Delhi", "Dwarka", "Rohini"] }
];

const mongoURI = "mongodb+srv://sahiltiwari:sahiltiwari@cluster0.aijuuzu.mongodb.net/hos?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(async () => {
    console.log("MongoDB connected ✅");

    // Insert Departments
    for (const name of departments) {
      await Department.updateOne({ name }, { name }, { upsert: true });
    }
    console.log("Departments injected ✅");

    // Insert Country
    const country = await Country.findOneAndUpdate(
      { name: "India" },
      { name: "India" },
      { upsert: true, new: true }
    );

    // Insert States + Cities
    for (const stateData of indiaStates) {
      const state = await State.findOneAndUpdate(
        { name: stateData.name, countryId: country._id },
        { name: stateData.name, countryId: country._id },
        { upsert: true, new: true }
      );

      for (const cityName of stateData.cities) {
        await City.updateOne(
          { name: cityName, stateId: state._id },
          { name: cityName, stateId: state._id },
          { upsert: true }
        );
      }
    }

    console.log("Country → States → Cities injected ✅");
    process.exit();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
