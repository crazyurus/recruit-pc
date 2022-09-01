import Layout from '../components/layout';
import type { AppProps } from 'next/app';

import '../styles/global.css';
import '../styles/content.css';

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const title = 'getTitle' in Component ? Component.getTitle(pageProps) : pageProps.title;

  return (
    <Layout title={title}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
