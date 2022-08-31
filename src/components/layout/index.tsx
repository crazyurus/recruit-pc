import React, { Fragment, PropsWithChildren } from 'react';
import Head from 'next/head';
import Header from './header';
import Content from './content';
import Footer from './footer';

interface Props {
  title: string;
}

function Layout(props: PropsWithChildren<Props>): JSX.Element {
  const { title = '宣讲会', children } = props;

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#4f46e5" />
      </Head>
      <div className="min-h-full bg-gray-100">
        <Header>{title}</Header>
        <Content>{children}</Content>
        <Footer />
      </div>
    </Fragment>
  );
}

export default Layout;
