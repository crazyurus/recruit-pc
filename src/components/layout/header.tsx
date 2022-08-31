import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';

function Header(props: PropsWithChildren<{}>): JSX.Element {
  return (
    <header className={classNames(styles.header, 'bg-indigo-600', 'py-10')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">{props.children}</h1>
      </div>
    </header>
  );
}

export default Header;
