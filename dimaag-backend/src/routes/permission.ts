import {
  addPermission,
  getContentWithPermission,
  getSharedWithPeople,
  removePermisson,
} from '@/controllers/permissionController';
import { verifyClerkSession } from '@/middleware/verifyClerk';
import { clerkMiddleware } from '@clerk/express';
import { Router } from 'express';
const router = Router();
router.get('/:username', getContentWithPermission);
router.use(clerkMiddleware());
router.post('/', verifyClerkSession, addPermission);
router.get('/user/:id', verifyClerkSession, getSharedWithPeople);
router.delete('/', verifyClerkSession, removePermisson);
export default router;
