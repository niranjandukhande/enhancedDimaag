import express from 'express';
import { userWebhook } from '@/controllers/webHookController';

const router = express.Router();

router.post('/user', express.raw({ type: 'application/json' }), userWebhook);

export default router;
