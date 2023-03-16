import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from '@/config'

const fetchOpenai = async () => {
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "Hello world"}],
  });
  console.log(completion)
}

const Home = async() => {
  await fetchOpenai()
  return (
    <main>
      <div>TEST</div>
    </main>
  )
}

export default Home