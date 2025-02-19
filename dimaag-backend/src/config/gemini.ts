import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
export const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
export const embeddingModel = genAI.getGenerativeModel({
  model: 'text-embedding-004',
});
