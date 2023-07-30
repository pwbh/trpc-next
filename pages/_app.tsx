import '@/styles/reset.min.css';
import '@/styles/globals.css';

import { trpc } from '@/utils/trpc';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
