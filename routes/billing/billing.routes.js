const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billing/billing.controller');

router.post('/invoices', billingController.createInvoice);
router.get('/invoices', billingController.getInvoices);

module.exports = router;
