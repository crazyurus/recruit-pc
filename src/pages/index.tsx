import React, { Fragment, useState, useRef } from 'react';
import { useDebounce } from 'react-use';
import useSWR from 'swr';
import Link from 'next/link';
import useStore from '../store';
import { getSeminarList } from '../service';
import Layout from '../components/layout';
import Select from '../components/select';
import Seminar from '../components/seminar';
import Pagination from '../components/pagination';
import Loading from '../components/loading';
import Search from '../components/search';

function List(): JSX.Element | null {
  const totalRef = useRef(0);
  const [ debouncedSearch, setDebouncedSearch ] = useState('');
  const { page, size, search, school, setCurrentPage } = useStore();
  const { data } = useSWR(`/list?page=${page}&size=${size}search=${debouncedSearch}&school=${school}`, getSeminarList.bind(null, { page, size, search: debouncedSearch, school }));

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
          <Link key={item.id} href={`/${school}/detail/${item.id}`}>
            <Seminar {...item} />
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
    <div className="pt-6">
      <List />
    </div>
  );
}

function getLayout(page: JSX.Element): JSX.Element {
  return (
    <Layout title={<Select />} action={<Search />}>{page}</Layout>
  );
}

Home.getLayout = getLayout;

export default Home;
