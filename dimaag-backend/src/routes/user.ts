import express from 'express';
import { verifyClerkSession } from '@/middleware/verifyClerk';
import { getAllUsers, getUserDetails } from '@/controllers/userController';

const router = express.Router();
router.get('/', verifyClerkSession, getUserDetails);
router.get('/all', getAllUsers);
export default router;
