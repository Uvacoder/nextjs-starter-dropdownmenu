import Router from 'next/router';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';

import '@/styles/global.css';
import 'nprogress/nprogress.css';

import type { AppType } from 'next/app';
import type { Session } from 'next-auth';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;
