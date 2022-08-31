import React, { PropsWithChildren } from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';

function Layout(props: PropsWithChildren<{}>): JSX.Element {
  return (
    <div className="min-h-full bg-gray-100">
      <Header>宣讲会</Header>
      <Content>{props.children}</Content>
      <Footer />
    </div>
  );
}

export default Layout;
