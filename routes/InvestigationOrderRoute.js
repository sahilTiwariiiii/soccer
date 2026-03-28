import express from 'express';
import { 
    createInvestigationOrder, 
    getAllInvestigationOrders, 
    getInvestigationOrderById, 
    getOrdersByVisit, 
    updateOrderStatus, 
    addInvestigationResult, 
    deleteInvestigationOrder 
} from '../controllers/InvestigationOrderController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createInvestigationOrder);
router.get('/', authMiddleware, getAllInvestigationOrders);
router.get('/:id', authMiddleware, getInvestigationOrderById);
router.get('/visit/:visitId', authMiddleware, getOrdersByVisit);
router.patch('/:id/status', authMiddleware, updateOrderStatus);
router.patch('/:id/result', authMiddleware, addInvestigationResult);
router.delete('/:id', authMiddleware, deleteInvestigationOrder);

export default router;
