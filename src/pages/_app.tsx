import Layout from '../components/layout';
import type { AppProps } from 'next/app';

import '../styles/global.css';
import '../styles/content.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout title={pageProps.title}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
