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
  Component: NextPageWithLayout
}

function getDefaultLayout(page: JSX.Element, pageProps: any): JSX.Element {
  return <Layout title={pageProps.title}>{page}</Layout>;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? getDefaultLayout;

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover" />
      </Head>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </Fragment>
  );
}

export default MyApp;
