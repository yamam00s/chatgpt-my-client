import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from '@/config'
import { OPENAI_API_URL } from '@/constants'

export type ChatGPTResponse = string
type RetrieveChatGPTResponse = (prompt: string) => Promise<ChatGPTResponse>

const modelName = 'gpt-3.5-turbo'
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${OPENAI_API_KEY}`,
};

export const retrieveChatGPTResponse: RetrieveChatGPTResponse = async (prompt: string) => {
  try {
    const response = await fetch(
      OPENAI_API_URL,
      {
        method: 'POST',
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: 'user', content: prompt }],
        }),
        headers
      },
    )
    const result = await response.json()

    return result.choices[0].message.content ?? 'no data'
  } catch (error) {
    console.error(error)
    return 'エラーが発生しました'
  }
}