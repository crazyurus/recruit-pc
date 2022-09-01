import React, { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
  const tips = detail.tips ? (
    <Fragment>
      <div className={styles.title}>本校提醒</div>
      <p className={styles.content}>{detail.tips}</p>
    </Fragment>
  ) : null;
  const positions = detail.positions.length > 0 ? (
    <Fragment>
      <div className={styles.title}>招聘专业</div>
      <p className={styles.content}>{detail.positions.join('、')}</p>
    </Fragment>
  ) : null;
  const basicInfo = (
    <div className={styles.basic}>
      <div className={styles.col}>
        <div className={styles.label}>宣讲时间</div>
        <div className={styles.value}>{detail.time}</div>
      </div>
      <div className={styles.col}>
        <div className={styles.label}>宣讲地点</div>
        <div className={styles.value}>{detail.address}</div>
      </div>
      <div className={styles.col}>
        <div className={styles.label}>招聘企业</div>
        <div className={styles.value}>
          <Link href={`/company/${detail.company.id}`}>
            <a>{detail.company.name}</a>
          </Link>
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.label}>来源</div>
        <div className={styles.value}>{detail.source}</div>
      </div>
    </div>
  );

  console.log(detail)

  return (
    <Fragment>
      <Head>
        <title>{detail.title}</title>
      </Head>
      <div className="markdown-body p-6">
        {basicInfo}
        <div className={styles.title}>宣讲会内容</div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: detail.content }}
        />
        {positions}
        <div className={styles.title}>联系方式</div>
        <p>
          <a href={`mailto:${detail.contact.email}`}>{detail.contact.email}</a>
        </p>
        {tips}
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
