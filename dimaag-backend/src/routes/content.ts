import express from 'express';
import {
  addContent,
  deleteContent,
  getContent,
  searchContent,
} from '@/controllers/contentController';
import { verifyClerkSession } from '@/middleware/verifyClerk';

const router = express.Router();

router.post('/', verifyClerkSession, addContent);
router.get('/', verifyClerkSession, getContent);
router.delete('/:id', verifyClerkSession, deleteContent);
router.post('/search', verifyClerkSession, searchContent);
export default router;
