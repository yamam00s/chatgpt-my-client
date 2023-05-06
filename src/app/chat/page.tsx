import Link from 'next/link';

import { ChatContainer } from './containers/ChatContainer';

const Chat = async () => {
  return (
    <main>
      <h1>chatgpt-my-client</h1>
      <Link href="/chat/history">historys</Link>
      <ChatContainer />
    </main>
  );
};

export default Chat;
