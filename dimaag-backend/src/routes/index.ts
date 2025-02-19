import express from 'express';
import contentRouter from '@/routes/content';
import userRouter from '@/routes/user';
import webHookRouter from '@/routes/webhook';

const router = express.Router();

router.use('/webhook', webHookRouter);

router.use(express.json());

router.use('/user', userRouter);

router.use('/content', contentRouter);
export default router;
