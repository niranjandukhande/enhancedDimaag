import express, { Request, Response } from 'express';
import { verifyClerkSession } from '@/middleware/verifyClerk';
import { getAllUsers, getUserDetails } from '@/controllers/userController';

const router = express.Router();
router.get('/', verifyClerkSession, getUserDetails);
router.get('/all', getAllUsers);
router.post('/test', test);
export default router;
async function test(req: Request, res: Response) {
  console.log('req.body', req.body);
  res.status(200).json({ message: 'hello' });
}
