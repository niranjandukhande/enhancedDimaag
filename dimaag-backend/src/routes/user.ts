import express from 'express';
import { verifyClerkSession } from '@/middleware/verifyClerk';
import { getUserDetails } from '@/controllers/userController';

const router = express.Router();
router.get('/', verifyClerkSession, getUserDetails);
export default router;
