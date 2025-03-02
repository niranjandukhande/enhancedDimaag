import express, { Request, Response } from 'express';
import { verifyClerkSession } from '@/middleware/verifyClerk';
import {
  getAllUsers,
  getUserDetails,
  updateUserDetails,
} from '@/controllers/userController';
import { verify } from 'crypto';

const router = express.Router();
router.get('/', verifyClerkSession, getUserDetails);
router.get('/all', getAllUsers);
router.put('/update', verifyClerkSession, updateUserDetails);
router.post('/test', test);
export default router;
async function test(req: Request, res: Response) {
  console.log('req.body', req.body);
  res.status(200).json({ message: 'hello' });
}
