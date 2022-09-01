import React from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';

interface Props {
  title: string;
  description?: JSX.Element;
  action?: JSX.Element;
}

function Header(props: Props): JSX.Element {
  return (
    <header className={classNames(styles.header, 'bg-indigo-600', 'pt-10')}>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-col-reverse sm:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {props.title}
          </h1>
          {props.description}
        </div>
        {props.action}
      </div>
    </header>
  );
}

export default Header;
