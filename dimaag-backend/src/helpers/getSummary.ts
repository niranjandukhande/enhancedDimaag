import Groq from "groq-sdk";
import { model } from "../config/gemini";
import { getEmbeddings } from "./getEmbeddings";

export async function getSummary(text: string) {
    const startTime = Date.now(); // Start timestamp

    const prompt = `Summarize the following content concisely while preserving key details and important insights:
    
    "${text}"`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    // const groq = new Groq({
    //     apiKey: process.env.GROQ_KEY
    // })

    // const chatCompletion = await groq.chat.completions.create({
    //     messages: [{ role: 'user', content: prompt }],
    //     model: 'llama3-8b-8192',
    //   });
    await getEmbeddings(summary)
    const endTime = Date.now(); // End timestamp
    console.log(`Summary generated in ${endTime - startTime} ms`);
    // console.log(chatCompletion.choices[0].message);
}
