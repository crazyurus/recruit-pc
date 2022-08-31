import React from 'react';
import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import type { Seminar as Props } from '../../types';

function Seminar(props: Props): JSX.Element {
  const { title, company, time, address } = props;

  return (
    <div className="relative flex space-x-6 py-6 px-5 xl:static cursor-pointer hover:bg-indigo-50">
      <Image src={company.logo} alt={company.name} className="flex-none rounded-full" width={56} height={56} />
      <div className="flex-auto">
        <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{title}</h3>
        <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
          <div className="flex items-center space-x-3">
            <dt>
              <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd>{time}</dd>
          </div>
          <div className="mt-2 flex items-center space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
            <dt>
              <LocationMarkerIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd>{address}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default Seminar;
