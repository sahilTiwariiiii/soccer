import express from 'express';
import * as billingController from '../../controllers/billing/billing.controller.js';
const router = express.Router();

router.post('/invoices', billingController.createInvoice);
router.get('/invoices', billingController.getInvoices);

export default router;
