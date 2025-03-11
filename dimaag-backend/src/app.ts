import cors from 'cors';
import 'dotenv/config';
import express, { Errback, Request, Response } from 'express';
import rootRouter from '@/routes/index';
import morgan from 'morgan';
export const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://enhanced-dimaag.vercel.app','enhanced-dimaag-nine.vercel.app'],
    credentials: true,
  }),
);
app.use(morgan('dev'));

app.use((err: Errback, req: Request, res: Response, _next: Function) => {
  console.error(
    `[ERROR] ${new Date().toISOString()} - ${req.method} ${req.url}`,
  );
  console.error(err);
  res.status(500).send('Something went wrong');
});
app.get('/', (req: Request, res: Response) => {
  res.send('Server is up and running');
});
app.use('/api/v1', rootRouter);
