import express from 'express';
import {
  addContent,
  deleteContent,
  getContent,
} from '@/controllers/contentController';
import { verifyClerkSession } from '@/middleware/verifyClerk';

const router = express.Router();

router.post('/', verifyClerkSession, addContent);
router.get('/', verifyClerkSession, getContent);
router.delete('/:id', verifyClerkSession, deleteContent);
export default router;
