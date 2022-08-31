import React, { Fragment } from 'react';
import Head from 'next/head';
import { getSeminarDetail } from '../../service';
import type { GetServerSidePropsContext } from 'next';
import type { SeminarDetail } from '../../types';

interface Props {
  title: string;
  detail: SeminarDetail;
}

function Detail(props: Props): JSX.Element {
  const { detail } = props;

  return (
    <Fragment>
      <Head>
        <title>{detail.title}</title>
      </Head>
      <div className="p-6">
        <div dangerouslySetInnerHTML={{ __html: detail.content }}></div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: Props }> {
  const { id } = context.params as { id: string };
  const detail = await getSeminarDetail(id);

  return {
    props: {
      title: detail.title,
      detail,
    },
  };
}

export default Detail;
