import React, { Fragment } from 'react';
import { getCompanyDetail } from '../../service';
import Layout from '../../components/layout';
import type { GetServerSidePropsContext } from 'next';
import type { Company } from '../../types';

interface Props {
  title: string;
  detail: Company;
}

function Detail(props: Props): JSX.Element {
  const { detail } = props;

  return (
    <Fragment>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-semibold font-mono">{detail.license}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">统一社会信用代码</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">所在地</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{detail.region}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">企业类型</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{detail.type}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">行业</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{detail.industry}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">企业规模</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{detail.scale}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">注册资本</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{detail.registeredCapital}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">成立时间</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{detail.createTime}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">企业网站</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text-primary hover:underline">
              <a href={`http://${detail.website}`} target="_blank" rel="noreferrer">{detail.website}</a>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">地址</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{detail.address}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">简介</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 cursor-text select-text whitespace-pre-wrap">{detail.introduction}</dd>
          </div>
        </dl>
      </div>
    </Fragment>
  );
}

function getLayout(page: JSX.Element, props: Props): JSX.Element {
  const { title, detail } = props;
  const description = (
    <div className="mt-3 -mb-2">
      {detail.tags.map(tag => (
        <span key={tag} className="inline-block bg-white bg-opacity-20 text-white text-xs tracking-wide rounded-md mb-2 mr-3 px-2 py-1">{tag}</span>
      ))}
    </div>
  );

  return (
    <Layout title={title} description={description}>{page}</Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: Props }> {
  const { id } = context.params as { id: string };
  const detail = await getCompanyDetail(id);

  return {
    props: {
      title: detail.name,
      detail,
    },
  };
}

Detail.getLayout = getLayout;

export default Detail;
