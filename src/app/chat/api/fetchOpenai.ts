import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from '@/config'

export type FetchOpenaiResponse = string
type FetchOpenai = (prompt: string) => Promise<FetchOpenaiResponse>

const modelName = 'gpt-3.5-turbo'

export const fetchOpenai: FetchOpenai = async (prompt: string) => {
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const completion = await openai.createChatCompletion({
      model: modelName,
      messages: [{role: "user", content: prompt}],
    });
    return completion.data.choices[0].message?.content ?? 'no data'
  } catch (error) {
    console.error(error)
    return 'エラーが発生しました'
  }
}