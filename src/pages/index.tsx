import React, { Fragment, useRef } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import useStore from '../store';
import { getSeminarList } from '../service';
import Seminar from '../components/seminar';
import Pagination from '../components/pagination';
import Loading from '../components/loading';
import type { NextPage } from 'next';

function List(): JSX.Element | null {
  const totalRef = useRef(0);
  const { page, size, setCurrentPage } = useStore();
  const { data } = useSWR(`/list?page=${page}`, getSeminarList.bind(null, { page, size }));

  if (data) {
    totalRef.current = data.total;
  }

  return (
    <Fragment>
      {data ? data.items.map(item => (
        <Seminar key={item.id} {...item} />
      )) : <Loading height={size * 104} />}
      <Pagination
        current={page}
        pageSize={size}
        total={totalRef.current}
        onChange={setCurrentPage}
      />
    </Fragment>
  );
}

const Home: NextPage = () => {
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

export default Home;
