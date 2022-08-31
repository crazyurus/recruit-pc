import React, { Fragment } from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import { getSeminarDetail } from '../../service';
import type { GetServerSidePropsContext } from 'next';
import type { SeminarDetail } from '../../types';
import styles from './id.module.scss';

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
        <div className={classNames(styles.content, 'cursor-text', 'select-text', 'markdown-body')}>
          <div dangerouslySetInnerHTML={{ __html: detail.content }}></div>
          {detail.tips ? (
            <blockquote>
              <p>温馨提醒：</p>
              <p>{detail.tips}</p>
            </blockquote>
          ) : null}
        </div>
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
