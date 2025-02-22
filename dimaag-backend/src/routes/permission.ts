import { getContentWithPermission } from '@/controllers/permissionController';
import { Router } from 'express';
const router = Router();
router.get('/:username', getContentWithPermission);
export default router;
