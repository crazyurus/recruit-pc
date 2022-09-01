import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router'
import useStore from '../../store';
import Search from '../search';
import styles from './header.module.scss';

function Header(props: PropsWithChildren<{}>): JSX.Element {
  const { setSearch } = useStore();
  const router = useRouter();
  const isIndex = router.pathname === '/';

  return (
    <header className={classNames(styles.header, 'bg-indigo-600', 'py-10')}>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-col-reverse sm:flex-row">
        <h1 className="text-3xl font-bold text-white">{props.children}</h1>
        {isIndex && <Search className={styles.search} onChange={setSearch} />}
      </div>
    </header>
  );
}

export default Header;
