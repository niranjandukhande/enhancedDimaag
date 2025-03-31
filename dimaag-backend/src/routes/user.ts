import {
  getAllUsers,
  getUserDetails,
  updateUserDetails,
} from '@/controllers/userController';
import { verifyClerkSession } from '@/middleware/verifyClerk';
import { clerkMiddleware } from '@clerk/express';
import express from 'express';

const router = express.Router();
router.use(clerkMiddleware());
router.get('/all', getAllUsers);
router.get('/', verifyClerkSession, getUserDetails);
router.put('/update', verifyClerkSession, updateUserDetails);
// router.post('/test', test);
export default router;
