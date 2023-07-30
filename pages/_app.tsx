import '@/styles/reset.min.css';
import '@/styles/globals.css';

import { trpc } from '@/utils/trpc';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default trpc.withTRPC(App);
