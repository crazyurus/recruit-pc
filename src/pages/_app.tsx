import React, { Fragment } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import '../styles/global.css';
import '../styles/content.css';

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: JSX.Element, props: P) => JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    title?: string;
  };
}

function getDefaultLayout(page: JSX.Element, pageProps: any): JSX.Element {
  return <Layout title={pageProps.title}>{page}</Layout>;
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { title = '就业招聘' } = pageProps;
  const getLayout = Component.getLayout ?? getDefaultLayout;

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover" />
        <title>{title}</title>
      </Head>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </Fragment>
  );
}

export default App;
