import express from 'express';
import {
  addContent,
  deleteContent,
  getContent,
  getContentById,
  searchContent,
  updateContent,
} from '@/controllers/contentController';
import { verifyClerkSession } from '@/middleware/verifyClerk';
import { clerkMiddleware } from '@clerk/express';

const router = express.Router();
router.use(clerkMiddleware());
router.post('/', verifyClerkSession, addContent);
router.get('/', verifyClerkSession, getContent);
router.delete('/:id', verifyClerkSession, deleteContent);
router.post('/search', verifyClerkSession, searchContent);
router.put('/:id', verifyClerkSession, updateContent);
router.get('/:id', verifyClerkSession, getContentById);
export default router;
