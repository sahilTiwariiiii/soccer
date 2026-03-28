import express from 'express';
import { getAuditLogs } from '../controllers/auditLog.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getAuditLogs);

export default router;
