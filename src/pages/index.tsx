import React, { Fragment, useState, useRef } from 'react';
import { useDebounce } from 'react-use';
import useSWR from 'swr';
import Link from 'next/link';
import { CalendarIcon } from '@heroicons/react/solid';
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
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { page, size, search, school, setCurrentPage } = useStore();
  const { data } = useSWR(
    `/list?page=${page}&size=${size}search=${debouncedSearch}&school=${school.id}`,
    getSeminarList.bind(null, { page, size, search: debouncedSearch, school: school.id })
  );

  useDebounce(
    () => {
      if (search !== debouncedSearch) {
        setCurrentPage(1);
      }

      setDebouncedSearch(search);
    },
    500,
    [search]
  );

  if (data) {
    totalRef.current = data.total;
  }

  const empty = debouncedSearch ? (
    <div className="px-6">
      未找到与 <strong>{debouncedSearch}</strong> 有关的宣讲会
    </div>
  ) : (
    <div className="px-6">
      <strong>{school.name}</strong>暂无宣讲会信息
    </div>
  );

  return (
    <Fragment>
      <div style={{ minHeight: 'calc(100vh - 290px)' }}>
        {data ? (
          data.items.length === 0 ? (
            empty
          ) : (
            data.items.map(item => (
              <Link key={item.id} href={`/${school.id}/detail/${item.id}`}>
                <Seminar {...item} />
              </Link>
            ))
          )
        ) : (
          <Loading height={size * 104} />
        )}
      </div>
      <Pagination current={page} pageSize={size} total={totalRef.current} onChange={setCurrentPage} />
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

function Action(): JSX.Element {
  const { school, setSchool } = useStore();

  return (
    <div className="flex gap-4">
      <Search />
      <Link
        className="flex shadow items-center justify-center rounded-md bg-gray-100 py-2 text-gray-400 hover:text-gray-500 w-9 h-9 px-2 hover:bg-white"
        href={`/${school.id}/calendar`}
      >
        <CalendarIcon className="h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  );
}

function getLayout(page: JSX.Element): JSX.Element {
  return (
    <Layout title={<Select />} action={<Action />}>
      {page}
    </Layout>
  );
}

Home.getLayout = getLayout;

export default Home;
