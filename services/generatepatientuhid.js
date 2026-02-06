import PatientRegistration from "../models/PatientRegistration.js";

export const generatepatientuhid = async () => {
    let generate_patient_uhid;
    generate_patient_uhid = `UHID-${Math.floor(100000 +Math.random() * 900000)}`;

    const exists = await PatientRegistration.findOne({ uhid:generate_patient_uhid });
    if (exists) {
      return await generatepatientuhid();
    }
    return generate_patient_uhid;
}