import React, { Fragment, useState, useRef } from 'react';
import { useDebounce } from 'react-use';
import useSWR from 'swr';
import Head from 'next/head';
import Link from 'next/link';
import useStore from '../store';
import { getSeminarList } from '../service';
import Layout from '../components/layout';
import Seminar from '../components/seminar';
import Pagination from '../components/pagination';
import Loading from '../components/loading';
import Search from '../components/search';

function List(): JSX.Element | null {
  const totalRef = useRef(0);
  const [ debouncedSearch, setDebouncedSearch ] = useState('');
  const { page, size, search, setCurrentPage } = useStore();
  const { data } = useSWR(`/list?page=${page}&size=${size}search=${debouncedSearch}`, getSeminarList.bind(null, { page, size, search: debouncedSearch }));

  useDebounce(() => {
    if (search !== debouncedSearch) {
      setCurrentPage(1);
    }

    setDebouncedSearch(search);
  }, 500, [search]);

  if (data) {
    totalRef.current = data.total;
  }

  const empty = (
    <div className="px-6">未找到与 <strong>{debouncedSearch}</strong> 有关的宣讲会</div>
  );

  return (
    <Fragment>
      <div style={{ minHeight: 'calc(100vh - 290px)' }}>
      {data ? (
        data.items.length === 0 ? empty : data.items.map(item => (
          <Link key={item.id} href={`/detail/${item.id}`}>
            <a><Seminar {...item} /></a>
          </Link>
        ))
      ) : <Loading height={size * 104} />}
      </div>
      <Pagination
        current={page}
        pageSize={size}
        total={totalRef.current}
        onChange={setCurrentPage}
      />
    </Fragment>
  );
}

function Home(): JSX.Element {
  return (
    <Fragment>
      <Head>
        <title>武汉理工大学就业招聘</title>
      </Head>
      <div className="pt-6">
        <List />
      </div>
    </Fragment>
  );
}

function getLayout(page: JSX.Element): JSX.Element {
  return (
    <Layout title="宣讲会" action={<Search />}>{page}</Layout>
  );
}

Home.getLayout = getLayout;

export default Home;
