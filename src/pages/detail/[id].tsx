import React, { Fragment } from 'react';
import classNames from 'classnames';
import { ShareIcon } from '@heroicons/react/solid';
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
  const major = detail.major.length > 0 ? (
    <Fragment>
      <div className={styles.title}>招聘专业</div>
      <p className={styles.content}>{detail.major.join('、')}</p>
    </Fragment>
  ) : null;
  const basicInfo = (
    <div className={classNames(styles.basic, 'md:flex')}>
      <div className={classNames(styles.col, 'md:flex md:max-w-1/2 max-w-full')}>
        <div className={styles.label}>宣讲时间</div>
        <div className={styles.value}>{detail.time}</div>
      </div>
      <div className={classNames(styles.col, 'md:flex md:max-w-1/2 max-w-full')}>
        <div className={styles.label}>宣讲地点</div>
        <div className={styles.value}>{detail.address}</div>
      </div>
      <div className={classNames(styles.col, 'md:flex md:max-w-1/2 max-w-full')}>
        <div className={styles.label}>招聘企业</div>
        <div className={styles.value}>
          <Link href={`/company/${detail.company.id}`}>
            <a>{detail.company.name}</a>
          </Link>
        </div>
      </div>
      <div className={classNames(styles.col, 'md:flex md:max-w-1/2 max-w-full')}>
        <div className={styles.label}>来源</div>
        <div className={styles.value}>{detail.source}</div>
      </div>
    </div>
  );
  const handleShare = () => {
    if ('share' in navigator) {
      navigator.share({
        url: location.href,
        title: document.title,
      });
    } else {
      alert('当前浏览器暂不支持分享');
    }
  };

  return (
    <div className="markdown-body p-6">
      {basicInfo}
      <div className={styles.title}>宣讲会内容</div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: detail.content }}
      />
      {major}
      <div className={styles.title}>联系方式</div>
      <p>
        <a href={`mailto:${detail.contact.email}`}>{detail.contact.email}</a>
      </p>
      {tips}
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center rounded-md bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 px-5 py-2 cursor-pointer" onClick={handleShare}>
          <ShareIcon className="h-5 w-5 mr-2" />
          <span>分享</span>
        </div>
      </div>
    </div>
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
