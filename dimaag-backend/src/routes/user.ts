import express, { Request, Response } from 'express';
import { verifyClerkSession } from '@/middleware/verifyClerk';
import {
  getAllUsers,
  getUserDetails,
  updateUserDetails,
} from '@/controllers/userController';
import { verify } from 'crypto';
import { clerkMiddleware } from '@clerk/express';

const router = express.Router();
router.get('/all', getAllUsers);
router.get('/', clerkMiddleware(), verifyClerkSession, getUserDetails);
router.put('/update', verifyClerkSession, updateUserDetails);
router.post('/test', test);
export default router;
async function test(req: Request, res: Response) {
  console.log('req.body', req.body);
  res.status(200).json({ message: 'hello' });
}
