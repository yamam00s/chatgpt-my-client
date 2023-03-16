import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from '@/config'

export type FetchOpenaiResponse = string
type FetchOpenai = (messages: string) => Promise<FetchOpenaiResponse>

export const fetchOpenai: FetchOpenai = async (messages: string) => {
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  console.log(OPENAI_API_KEY)
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: messages}],
  });

  return completion.data.choices[0].message?.content ?? 'no data'
}