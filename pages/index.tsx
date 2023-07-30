import { useSession, signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

const ColorChangeAnime = keyframes`
  0% {
    color: yellow;
  }
  33% {
    color: green;
  }
  66% {
    color: blue;
  }
  100% {
    color: yellow;
  }
`;

const Text = styled.h1`
  animation: ${ColorChangeAnime} 4s infinite;
  font-size: 32px;
  color: green;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <Text>tRPC + NextJS + Styled Components Template by @pwbh</Text>
        {!session && <button onClick={() => signIn()}>Login</button>}
        {session && <span>{session.user?.name}</span>}
        {session && <Link href="/api/auth/logout">Logout</Link>}
      </Content>
    </>
  );
}
