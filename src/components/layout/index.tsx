import React, { ComponentProps, PropsWithChildren } from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';

type Props = ComponentProps<typeof Header>;

function Layout(props: PropsWithChildren<Props>): JSX.Element {
  const { children, ...rest } = props;

  return (
    <div className="min-h-full bg-gray-100">
      <Header {...rest} />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: '',
};

export default Layout;
