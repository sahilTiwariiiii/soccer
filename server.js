import express from 'express';
import dotenv from 'dotenv';
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
import opdRoutes from './routes/opdroute/opd.routes.js';
import patientRegistrationRoutes from './routes/patientRegistration.routes.js';
import patientVisitRoutes from './routes/patientVisit.routes.js';
import patientTrackingRoutes from './routes/patientTracking.routes.js';
import roleRoutes from './routes/role.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8')
);
swaggerDocument.servers = [{ url: '/', description: 'Same origin' }];

const app = express();
dotenv.config();
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
import dashboardRoutes from './routes/dashboardRoutes.js';
app.use('/api/v1/dashboard', dashboardRoutes);

// Module prefixes
app.use('/api/v1/assets', assetRoutes);
app.use('/api/v1/equipment', equipmentRoutes);
app.use('/api/v1/certificates', certificateRoutes);
app.use('/api/v1/vitals', vitalsRoutes);
app.use('/api/v1/hospitals', hospitalRoutes);
app.use('/api/v1/geo', geoRoutes);
app.use('/api/v1/core', coreRoutes);
app.use('/api/v1/ipd/admissions', ipdAdmissionRoutes);
app.use('/api/v1/ipd/doctor-assignments', ipdDoctorAssignmentRoutes);
app.use('/api/v1/ipd', ipdQuickAdmissionRoutes);
app.use('/api/v1/ipd/daily-notes', ipdDailyNoteRoutes);
app.use('/api/v1/ipd/nursing-notes', ipdNursingNoteRoutes);
// OPD queue and visit summary
app.use('/api/v1/opd/tokens', opdTokenRoutes);
app.use('/api/v1/opd', opdRoutes);
app.use('/api/v1/patients', patientRegistrationRoutes);
app.use('/api/v1/patients', patientVisitRoutes);
app.use('/api/v1/patients', patientTrackingRoutes);
app.use('/api/v1/roles', roleRoutes);

// Branches / infrastructure
app.use('/api/v1/branches', branchRoutes);
app.use('/api/v1/floors', floorRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/beds', bedRoutes);
app.use('/api/v1/room-staff-assignments', roomStaffAssignmentRoutes);
app.use('/api/v1/pharmacy-payments', pharmacyPaymentRoutes);

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
      border-radius: 10px;
      margin-bottom: 16px;
      border-width: 1px;
      overflow: hidden;
      background: #ffffff;
    }
    .swagger-ui .opblock-summary {
      padding: 12px 18px;
    }
    .swagger-ui .opblock-summary-method {
      border-radius: 999px;
      padding: 4px 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-size: 11px;
    }
    .opblock.opblock-post {
      border-color: rgba(16, 185, 129, 0.5);
      background: #f0fdf4;
    }
    .opblock.opblock-get {
      border-color: rgba(59, 130, 246, 0.5);
      background: #eff6ff;
    }
    .opblock.opblock-put {
      border-color: rgba(234, 179, 8, 0.5);
      background: #fffbeb;
    }
    .opblock.opblock-delete {
      border-color: rgba(239, 68, 68, 0.5);
      background: #fef2f2;
    }
    .swagger-ui .btn {
      border-radius: 999px !important;
      padding: 6px 16px !important;
      font-size: 12px !important;
      font-weight: 500 !important;
    }
    .swagger-ui .btn.authorize {
      background: linear-gradient(90deg, #22c55e, #16a34a) !important;
      border: none !important;
      color: #fff !important;
    }
    .swagger-ui .btn.execute {
      background: linear-gradient(90deg, #6366f1, #3b82f6) !important;
      border: none !important;
      color: #fff !important;
    }
    .swagger-ui .model-box, 
    .swagger-ui .response-col_description__inner,
    .swagger-ui .parameters-container,
    .swagger-ui table {
      background: #ffffff !important;
      color: #111827 !important;
    }
    .swagger-ui .parameter__name,
    .swagger-ui .parameter__type,
    .swagger-ui .response-col_status {
      color: #2563eb !important;
    }
    .swagger-ui .tab li {
      color: #4b5563 !important;
    }
    .swagger-ui .tab li.active {
      color: #111827 !important;
      border-color: #6366f1 !important;
    }
  `
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

