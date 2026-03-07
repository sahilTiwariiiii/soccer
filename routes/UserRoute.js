import express from 'express';
import { loginController, registerUser } from '../controllers/authContoller.js';
import authMiddleware from '../middlewares/auth.js';
import { listUsers } from '../controllers/user.controller.js';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginController);
router.get('/users', authMiddleware, listUsers);
export default router;
