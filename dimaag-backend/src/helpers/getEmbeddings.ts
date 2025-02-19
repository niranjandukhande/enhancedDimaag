import { embeddingModel, model } from '@/config/gemini';

export async function getEmbbedings(text: string) {
  const startTime = Date.now();

  const prompt = `Summarize the following content concisely while preserving key details and important insights:
    
    "${text}"`;

  const summaryResponse = await model.generateContent(prompt);
  const summary = summaryResponse.response.text();
  const result = await embeddingModel.embedContent(summary);

  const endTime = Date.now();
  console.log(`Summary generated in ${endTime - startTime} ms`);
  return result.embedding.values;
}
