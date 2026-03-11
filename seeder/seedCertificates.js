import dotenv from 'dotenv';
import { ConnectDb } from '../db/database.js';
import Hospital from '../models/hospital/HospitalSchema.js';
import Branch from '../models/branches/BranchSchema.js';
import User from '../models/User.js';
import Patient from '../models/PatientRegistration.js';
import CertificateType from '../models/adminandroleandpermissionanagement/certificates/CertificateTypeSchema.js';
import CertificateTemplate from '../models/adminandroleandpermissionanagement/certificates/CertificateTemplateSchema.js';
import GeneratedCertificate from '../models/adminandroleandpermissionanagement/certificates/GeneratedCertificateSchema.js';
import CertificateSignature from '../models/adminandroleandpermissionanagement/certificates/CertificateSignatureSchema.js';

dotenv.config();

async function run() {
  await ConnectDb();

  const hospital = await Hospital.findOne();
  const branch = await Branch.findOne();
  const user = await User.findOne();
  const patient = await Patient.findOne();

  if (!hospital || !branch || !user) {
    console.error('Hospital, Branch or User not found. Run createInfra.js first.');
    process.exit(1);
  }

  // 1. Create Signatures
  const signaturesData = [
    { designation: 'Chief Medical Officer', signatureImage: 'https://via.placeholder.com/150x50?text=Signature+CMO' },
    { designation: 'Senior Consultant', signatureImage: 'https://via.placeholder.com/150x50?text=Signature+Consultant' },
    { designation: 'Medical Superintendent', signatureImage: 'https://via.placeholder.com/150x50?text=Signature+Superintendent' }
  ];

  const signatureDocs = [];
  for (const s of signaturesData) {
    let doc = await CertificateSignature.findOne({ designation: s.designation, hospitalId: hospital._id });
    if (!doc) {
      doc = await CertificateSignature.create({ ...s, hospitalId: hospital._id, branchId: branch._id, userId: user._id });
      console.log(`Created Signature: ${s.designation}`);
    }
    signatureDocs.push(doc);
  }

  // 2. Create Certificate Templates
  const templatesData = [
    {
      templateName: 'Standard Medical Certificate',
      category: 'Medical',
      layoutHtml: `
        <div style="font-family: Arial, sans-serif; padding: 40px; border: 2px solid #333; background: #fff;">
          <h1 style="text-align: center; color: #2c3e50; margin-bottom: 5px;">MEDICAL CERTIFICATE</h1>
          <h3 style="text-align: center; margin-top: 0;">GUC Hospital Management System</h3>
          <hr/>
          <p style="text-align: right;">Date: {{issueDate}}</p>
          <div style="margin-top: 30px; line-height: 1.6;">
            <p>This is to certify that <strong>Mr./Mrs./Ms. {{patientName}}</strong></p>
            <p>Age: {{age}} years, Gender: {{gender}}, UHID: {{uhid}}</p>
            <p>Has been examined on <strong>{{examinationDate}}</strong> and found to be suffering from:</p>
            <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #2c3e50;">{{diagnosis}}</p>
            <p>The patient is advised rest for <strong>{{restDays}}</strong> days from {{restFrom}} to {{restTo}}.</p>
          </div>
          <div style="margin-top: 50px; display: flex; justify-content: space-between;">
            <div>
              <p><strong>Treatment Given:</strong></p>
              <p>{{treatment}}</p>
            </div>
            <div style="text-align: center;">
              <img src="{{signatureImage}}" alt="Signature" style="max-width: 150px; border-bottom: 1px solid #000;"><br>
              <strong>{{doctorName}}</strong><br>
              {{designation}}
            </div>
          </div>
          <div style="margin-top: 30px; font-size: 10px; color: #777; text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
            This is a computer-generated certificate. Verification Code: {{verificationCode}}
          </div>
        </div>
      `,
      pageSize: 'A4',
      orientation: 'portrait'
    },
    {
      templateName: 'Fitness Certificate',
      category: 'Fitness',
      layoutHtml: `
        <div style="font-family: 'Segoe UI', sans-serif; padding: 40px; border: 5px double #27ae60; background: #fff;">
          <h1 style="text-align: center; color: #27ae60; text-transform: uppercase;">Fitness Certificate</h1>
          <h3 style="text-align: center;">GUC Multi-Speciality Hospital</h3>
          <p style="text-align: right;"><strong>Certificate No:</strong> {{certificateNumber}}</p>
          <div style="margin-top: 30px;">
            <p>I have examined <strong>{{patientName}}</strong> (UHID: {{uhid}}) and find him/her to be physically fit for <strong>{{purpose}}</strong>.</p>
            <p>Vital Signs:</p>
            <table style="width: 100%; border: 1px solid #eee; margin-bottom: 20px;">
               <tr style="background: #f0fdf4;">
                 <td style="padding: 8px;">BP: {{bp}}</td>
                 <td style="padding: 8px;">Pulse: {{pulse}} bpm</td>
                 <td style="padding: 8px;">Weight: {{weight}} kg</td>
               </tr>
            </table>
            <p>Remarks: {{remarks}}</p>
          </div>
          <div style="margin-top: 60px; text-align: right;">
            <img src="{{signatureImage}}" alt="Signature" style="max-width: 150px;"><br>
            <strong>{{doctorName}}</strong><br>
            {{designation}}
          </div>
        </div>
      `,
      pageSize: 'A4',
      orientation: 'portrait'
    },
    {
      templateName: 'Birth Certificate',
      category: 'Official',
      layoutHtml: `
        <div style="font-family: Georgia, serif; padding: 50px; border: 10px solid #e67e22; background: #fffaf0; text-align: center;">
          <h1 style="color: #e67e22; font-size: 36px;">BIRTH CERTIFICATE</h1>
          <p>Issued by GUC Hospital Authority</p>
          <div style="margin: 40px 0; text-align: left; line-height: 2;">
            <p>This is to certify that <strong>{{childName}}</strong> was born at GUC Hospital on <strong>{{dob}}</strong> at <strong>{{tob}}</strong>.</p>
            <p>Sex: {{gender}} | Weight: {{weight}} kg</p>
            <p>Father's Name: {{fatherName}}</p>
            <p>Mother's Name: {{motherName}}</p>
          </div>
          <div style="margin-top: 80px; display: flex; justify-content: space-around;">
             <div style="border-top: 1px solid #000; padding-top: 5px; width: 200px;">Registrar Signature</div>
             <div style="border-top: 1px solid #000; padding-top: 5px; width: 200px;">Hospital Stamp</div>
          </div>
        </div>
      `,
      pageSize: 'A4',
      orientation: 'landscape'
    }
  ];

  const templateDocs = [];
  for (const t of templatesData) {
    let doc = await CertificateTemplate.findOne({ templateName: t.templateName, hospitalId: hospital._id });
    if (!doc) {
      doc = await CertificateTemplate.create({ ...t, hospitalId: hospital._id, branchId: branch._id, createdBy: user._id });
      console.log(`Created Template: ${t.templateName}`);
    }
    templateDocs.push(doc);
  }

  // 3. Create Certificate Types
  const typesData = [
    { name: 'Medical Leave', description: 'Sick leave and rest recommendation', templateId: templateDocs[0]._id },
    { name: 'Fitness/Joining', description: 'Joining duty or sports fitness', templateId: templateDocs[1]._id },
    { name: 'Birth Record', description: 'Official birth certificate', templateId: templateDocs[2]._id }
  ];

  const typeDocs = [];
  for (const t of typesData) {
    let doc = await CertificateType.findOne({ name: t.name, hospitalId: hospital._id });
    if (!doc) {
      doc = await CertificateType.create({ ...t, hospitalId: hospital._id, branchId: branch._id });
      console.log(`Created Type: ${t.name}`);
    }
    typeDocs.push(doc);
  }

  // 4. Generate dummy certificates
  const generatedData = [
    {
      certificateNumber: 'CERT-2026-001',
      certificateTypeId: typeDocs[0]._id,
      templateId: templateDocs[0]._id,
      patientId: patient?._id,
      status: 'issued',
      verificationCode: 'V-XY-1234',
      filledData: {
        patientName: patient?.patientName || 'John Doe',
        age: patient?.age || 30,
        gender: patient?.gender || 'Male',
        uhid: patient?.uhid || 'U-001',
        issueDate: '2026-03-11',
        examinationDate: '2026-03-10',
        diagnosis: 'Severe Viral Fever & Dehydration',
        restDays: '5',
        restFrom: '2026-03-11',
        restTo: '2026-03-15',
        treatment: 'IV Fluids, Antipyretics, Bed Rest',
        doctorName: user.name,
        designation: 'Chief Medical Officer',
        signatureImage: signatureDocs[0].signatureImage,
        verificationCode: 'V-XY-1234'
      }
    },
    {
      certificateNumber: 'FIT-2026-002',
      certificateTypeId: typeDocs[1]._id,
      templateId: templateDocs[1]._id,
      patientId: patient?._id,
      status: 'issued',
      filledData: {
        certificateNumber: 'FIT-2026-002',
        patientName: patient?.patientName || 'John Doe',
        uhid: patient?.uhid || 'U-001',
        purpose: 'Joining Government Service',
        bp: '120/80 mmHg',
        pulse: '72',
        weight: '70',
        height: '175',
        remarks: 'The individual is in excellent physical health and fit for duty.',
        doctorName: user.name,
        designation: 'Senior Consultant',
        signatureImage: signatureDocs[1].signatureImage
      }
    },
    {
      certificateNumber: 'BR-2026-003',
      certificateTypeId: typeDocs[2]._id,
      templateId: templateDocs[2]._id,
      patientId: patient?._id,
      status: 'draft',
      filledData: {
        childName: 'Baby of ' + (patient?.patientName || 'Jane Smith'),
        dob: '2026-03-05',
        tob: '10:45 AM',
        gender: 'Female',
        weight: '3.2',
        fatherName: 'Mr. Robert Smith',
        motherName: patient?.patientName || 'Jane Smith'
      }
    }
  ];

  for (const g of generatedData) {
    let doc = await GeneratedCertificate.findOne({ certificateNumber: g.certificateNumber });
    if (!doc) {
      await GeneratedCertificate.create({ ...g, hospitalId: hospital._id, branchId: branch._id, issuedBy: user._id });
      console.log(`Generated Certificate: ${g.certificateNumber}`);
    }
  }

  console.log('Certificate Seeding completed with multiple samples!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
