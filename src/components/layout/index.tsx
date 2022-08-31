import React, { PropsWithChildren } from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';

interface Props {
  title: string;
}

function Layout(props: PropsWithChildren<Props>): JSX.Element {
  const { title = '宣讲会', children } = props;

  return (
    <div className="min-h-full bg-gray-100">
      <Header>{title}</Header>
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}

export default Layout;
