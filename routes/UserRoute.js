import express from 'express';
import { loginController, registerUser } from '../controllers/authContoller.js';

const router=express.Router();


router.post('/register',registerUser);
router.post('/login',loginController);
export default router;