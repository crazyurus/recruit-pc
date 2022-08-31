import React, { Fragment } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import useStore from '../store';
import { getSeminarList } from '../service';
import Seminar from '../components/seminar';
import type { NextPage } from 'next';

function List(): JSX.Element | null {
  const { page } = useStore();
  const { data } = useSWR(`/list?page=${page}`, getSeminarList.bind(null, { page }));

  return data ? (
    <Fragment>
      {data.map(item => (
        <Seminar key={item.id} {...item} />
      ))}
    </Fragment>
  ): null;
}

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>武汉理工大学就业招聘</title>
      </Head>
      <div>
        <List />
      </div>
    </Fragment>
  );
}

export default Home;
