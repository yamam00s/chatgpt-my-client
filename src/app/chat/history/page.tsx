'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import useSWR from 'swr';

import { OPENAI_API_URL } from '@/constants';

const Home = () => {
  const { data } = useSWR(OPENAI_API_URL);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <main>
      <h1>history</h1>
      <Link href="/chat">back</Link>
    </main>
  );
};

export default Home;
