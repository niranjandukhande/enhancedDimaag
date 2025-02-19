import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
const model = genAI.getGenerativeModel({ model: "text-embedding-004"});

export async function getEmbeddings(text: string) {
    const result = await model.embedContent(text);
    console.log(result.embedding.values);
}


