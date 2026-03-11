import express from 'express';
import { loginController, registerUser } from '../controllers/authContoller.js';
import authMiddleware from '../middlewares/auth.js';
import { listUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';

const router=express.Router();

router.post('/register', authMiddleware, registerUser);
router.post('/login', loginController);
router.get('/users', authMiddleware, listUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;
