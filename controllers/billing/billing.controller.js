import Invoice from '../../models/billing/Invoice.js';

export const createInvoice = async (req, res) => {
    try {
        const invoice = new Invoice(req.body);
        await invoice.save();
        res.status(201).send(invoice);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({}).populate('patient');
        res.send(invoices);
    } catch (error) {
        res.status(500).send(error);
    }
};
