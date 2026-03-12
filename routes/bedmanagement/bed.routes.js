const express = require('express');
const router = express.Router();
const bedController = require('../controllers/bedmanagement/bed.controller');

router.post('/wards', bedController.createWard);
router.get('/wards', bedController.getWards);
router.post('/beds', bedController.createBed);
router.get('/beds', bedController.getBeds);
router.put('/beds/:bedId/assign', bedController.assignBed);
router.put('/beds/:bedId/discharge', bedController.dischargeBed);

module.exports = router;
