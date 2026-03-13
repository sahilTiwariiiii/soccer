import express from 'express';
import * as bedController from '../../controllers/bedmanagement/bed.controller.js';
const router = express.Router();

router.post('/wards', bedController.createWard);
router.get('/wards', bedController.getWards);
router.post('/beds', bedController.createBed);
router.get('/beds', bedController.getBeds);
router.put('/beds/:bedId/assign', bedController.assignBed);
router.put('/beds/:bedId/discharge', bedController.dischargeBed);

export default router;
