import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import multer from 'multer';
import authMiddleware from './middlewares/auth.js';

import { ConnectDb } from './db/database.js';
import UserRoute from './routes/UserRoute.js';
import PatientRegistrationAndVisitedRoute from './routes/PatientRegistrationAndVisitedRoute.js';
import clinicalDetailsRoute from './routes/clinicalDetailsRoute.js';
import assetRoutes from './routes/assetmanagementroute/index.js';
import equipmentRoutes from './routes/equipmentmanagementroute/index.js';
import certificateRoutes from './routes/certificatesroute/index.js';
import vitalsRoutes from './routes/vitalsroute/index.js';
import hospitalRoutes from './routes/hospitalroute/index.js';
import geoRoutes from './routes/georoute/index.js';
import coreRoutes from './routes/coreroute/index.js';
import pharmacyRoutes from './routes/pharmacyroute/index.js';
import ambulanceRoutes from './routes/ambulanceroute/index.js';
import ipdAdmissionRoutes from './routes/ipdroute/ipdAdmission.routes.js';
import ipdDoctorAssignmentRoutes from './routes/ipdroute/ipdDoctorAssignment.routes.js';
import ipdQuickAdmissionRoutes from './routes/ipdroute/ipdQuickAdmission.routes.js';
import ipdDailyNoteRoutes from './routes/ipdroute/ipdDailyNote.routes.js';
import ipdNursingNoteRoutes from './routes/ipdroute/ipdNursingNote.routes.js';
import branchRoutes from './routes/branchesroute/branch.routes.js';
import floorRoutes from './routes/branchesroute/floor.routes.js';
import roomRoutes from './routes/branchesroute/room.routes.js';
import bedRoutes from './routes/branchesroute/bed.routes.js';
import roomStaffAssignmentRoutes from './routes/branchesroute/roomStaffAssignment.routes.js';
import pharmacyPaymentRoutes from './routes/branchesroute/pharmacyPayment.routes.js';
import opdTokenRoutes from './routes/opdroute/opdToken.routes.js';
import appointmentRoutes from './routes/appointmentandschedulingroute/index.js';
import bloodBankRoutes from './routes/bloodbankroute/index.js';
import cssdRoutes from './routes/cssdroute/index.js';
import radiologyRoutes from './routes/radiologyroute/index.js';
import laboratoryRoutes from './routes/laboratoryroute/index.js';
import userManagementRoutes from './routes/usermanagement/index.js';
import billingRoutes from './routes/billing/billing.routes.js';
import ehrRoutes from './routes/ehr/ehr.routes.js';
import inventoryRoutes from './routes/inventory/inventory.routes.js';
import bedManagementRoutes from './routes/bedmanagement/bed.routes.js';
import opdRoutes from './routes/opdroute/opd.routes.js';
import patientRegistrationRoutes from './routes/patientRegistration.routes.js';
import patientVisitRoutes from './routes/patientVisit.routes.js';
import patientTrackingRoutes from './routes/patientTracking.routes.js';
import roleRoutes from './routes/role.routes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import investigationRoutes from './routes/InvestigationMasterRoute.js';
import investigationOrderRoutes from './routes/InvestigationOrderRoute.js';
import auditLogRoutes from './routes/auditLog.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8')
);
swaggerDocument.servers = [{ url: '/', description: 'Same origin' }];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

ConnectDb();

// Core prefix
const upload = multer();
app.post('/api/v1/register', authMiddleware, upload.none(), UserRoute);
app.use('/api/v1', UserRoute);
app.use('/api/v1', PatientRegistrationAndVisitedRoute);
app.use('/api/v1', clinicalDetailsRoute);
app.use('/api/v1/dashboard', dashboardRoutes);

// Module prefixes
app.use('/api/v1/assets', authMiddleware, assetRoutes);
app.use('/api/v1/equipment', authMiddleware, equipmentRoutes);
app.use('/api/v1/certificates', authMiddleware, certificateRoutes);
app.use('/api/v1/vitals', authMiddleware, vitalsRoutes);
app.use('/api/v1/hospitals', authMiddleware, hospitalRoutes);
app.use('/api/v1/geo', authMiddleware, geoRoutes);
app.use('/api/v1/core', authMiddleware, coreRoutes);
app.use('/api/v1/pharmacy', authMiddleware, pharmacyRoutes);
app.use('/api/v1/ambulance', authMiddleware, ambulanceRoutes);
app.use('/api/v1/appointments', authMiddleware, appointmentRoutes);
app.use('/api/v1/blood-bank', authMiddleware, bloodBankRoutes);
app.use('/api/v1/cssd', authMiddleware, cssdRoutes);
app.use('/api/v1/radiology', authMiddleware, radiologyRoutes);
app.use('/api/v1/laboratory', authMiddleware, laboratoryRoutes);
app.use('/api/v1/usermanagement', authMiddleware, userManagementRoutes);
app.use('/api/v1/billing', authMiddleware, billingRoutes);
app.use('/api/v1/ehr', authMiddleware, ehrRoutes);
app.use('/api/v1/inventory', authMiddleware, inventoryRoutes);
app.use('/api/v1/bedmanagement', authMiddleware, bedManagementRoutes);

app.use('/api/v1/ipd/doctor-assignments', authMiddleware, ipdDoctorAssignmentRoutes);
app.use('/api/v1/ipd/admissions', authMiddleware, ipdAdmissionRoutes);
app.use('/api/v1/ipd', authMiddleware, ipdQuickAdmissionRoutes);
app.use('/api/v1/ipd/daily-notes', authMiddleware, ipdDailyNoteRoutes);
app.use('/api/v1/ipd/nursing-notes', authMiddleware, ipdNursingNoteRoutes);
app.use('/api/v1/investigations', authMiddleware, investigationRoutes);
app.use('/api/v1/investigation-orders', authMiddleware, investigationOrderRoutes);
app.use('/api/v1/audit-logs', authMiddleware, auditLogRoutes);
// OPD queue and visit summary
app.use('/api/v1/opd/tokens', authMiddleware, opdTokenRoutes);
app.use('/api/v1/opd', authMiddleware, opdRoutes);
app.use('/api/v1/patients', authMiddleware, patientRegistrationRoutes);
app.use('/api/v1/patients', authMiddleware, patientVisitRoutes);
app.use('/api/v1/patients', authMiddleware, patientTrackingRoutes);
app.use('/api/v1/roles', authMiddleware, roleRoutes);

// Branches / infrastructure
app.use('/api/v1/branches', authMiddleware, branchRoutes);
app.use('/api/v1/floors', authMiddleware, floorRoutes);
app.use('/api/v1/rooms', authMiddleware, roomRoutes);
app.use('/api/v1/beds', authMiddleware, bedRoutes);
app.use('/api/v1/room-staff-assignments', authMiddleware, roomStaffAssignmentRoutes);
app.use('/api/v1/pharmacy-payments', authMiddleware, pharmacyPaymentRoutes);

// Serve raw swagger.json
app.get('/swagger.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'swagger.json'));
});

// Swagger UI (light theme)
const swaggerUiOptions = {
  customSiteTitle: 'API Docs',
  customCss: `
    :root {
      color-scheme: light;
    }
    body {
      margin: 0;
      background: #f7f7f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #111827;
    }
    .swagger-ui {
      max-width: 1200px;
      margin: 24px auto 48px;
      padding: 24px 32px 40px;
      border-radius: 12px;
      background: #ffffff;
      box-shadow: 0 8px 28px rgba(17, 24, 39, 0.08);
    }
    .swagger-ui .topbar {
      background: transparent;
      padding: 0 0 12px 0;
      border-bottom: 1px solid rgba(17, 24, 39, 0.08);
      margin-bottom: 18px;
    }
    .swagger-ui .topbar-wrapper {
      justify-content: space-between;
    }
    .swagger-ui .topbar a span {
      color: #2563eb;
      font-weight: 700;
      letter-spacing: 0.04em;
    }
    .swagger-ui .topbar .download-url-wrapper {
      display: none !important;
    }
    .swagger-ui .info .title {
      color: #111827;
      font-size: 28px;
      font-weight: 650;
      letter-spacing: 0.02em;
    }
    .swagger-ui .info .description {
      color: #4b5563;
      font-size: 14px;
      line-height: 1.6;
    }
    .swagger-ui .scheme-container {
      background: #fafafa;
      border-radius: 10px;
      border: 1px solid rgba(17, 24, 39, 0.08);
    }
    .swagger-ui .opblock {
      border-radius: 8px;
      border: 1px solid rgba(17, 24, 39, 0.08);
      box-shadow: none;
      margin-bottom: 12px;
    }
    .swagger-ui .opblock .opblock-summary {
      padding: 12px 16px;
    }
    .swagger-ui .opblock-tag {
      font-size: 18px;
      border-bottom: none;
      padding: 24px 0 12px 0;
      color: #111827;
    }
    .swagger-ui .btn.authorize {
      background-color: #2563eb;
      color: #fff;
      border-color: #2563eb;
      border-radius: 6px;
      font-weight: 600;
    }
    .swagger-ui .btn.authorize svg {
      fill: #fff;
    }
  `,
};

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerUiOptions)
);

// Fallback for static assets or other routes
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
