import React from 'react';
import { CalendarIcon, LocationMarkerIcon, EyeIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { Seminar as Props, Status } from '../../types';

function StatusTag(props: { value: Status }): JSX.Element {
  const status = props.value;

  switch (status) {
    case Status.IN_PROGRESS:
      return <div className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 flex-shrink-0">进行中</div>;
    case Status.CANCELED:
      return <div className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 flex-shrink-0">已取消</div>;
    case Status.EXPIRED:
      return <div className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 flex-shrink-0">已结束</div>;
  }
}

function Seminar(props: Props): JSX.Element {
  const { title, company, time, address, view, status } = props;

  return (
    <div className="relative flex space-x-6 py-6 px-5 sm:static cursor-pointer sm:hover:bg-indigo-50 active:bg-indigo-50">
      <div className="flex-shrink-0 w-14 h-14">
        <Image src={company.logo} alt={company.name} className="rounded-md" width={56} height={56} />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="pr-10 font-semibold text-gray-900 sm:pr-0">{title}</h3>
          <StatusTag value={status} />
        </div>
        <dl className="mt-2 flex flex-col text-gray-500 sm:flex-row">
          <div className="flex items-center space-x-2">
            <dt>
              <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd>{time}</dd>
          </div>
          <div className="mt-2 flex items-center space-x-2 sm:mt-0 sm:ml-3.5 sm:border-l sm:border-gray-400 sm:border-opacity-50 sm:pl-3.5">
            <dt>
              <LocationMarkerIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd>{address}</dd>
          </div>
          <div className="mt-2 hidden sm:flex items-center space-x-2 sm:mt-0 sm:ml-3.5 sm:border-l sm:border-gray-400 sm:border-opacity-50 sm:pl-3.5">
            <dt>
              <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd>{view}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default Seminar;
