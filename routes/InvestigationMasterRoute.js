import express from 'express'
import { CreateInvestigationMaster, DeleteInvestigationMaster, GetAllInvestigationMaster, UpdateInvestigationMaster } from '../controllers/InvestigationController.js';

const router=express.Router();

router.post("/investigation",CreateInvestigationMaster);
router.put("investigation/:id",UpdateInvestigationMaster);
router.get("investigation",GetAllInvestigationMaster);
router.delete("investigation/:id",DeleteInvestigationMaster);

export default router;