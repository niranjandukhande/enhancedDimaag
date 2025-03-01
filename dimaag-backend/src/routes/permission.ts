import {
  addPermission,
  getContentWithPermission,
  getSharedWithPeople,
  removePermisson,
} from '@/controllers/permissionController';
import { verifyClerkSession } from '@/middleware/verifyClerk';
import { Router } from 'express';
const router = Router();
router.get('/:username', getContentWithPermission);
router.post('/', verifyClerkSession, addPermission);
router.get('/user/:id', verifyClerkSession, getSharedWithPeople);
router.delete('/', verifyClerkSession, removePermisson);
export default router;
