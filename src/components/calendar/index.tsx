import React, { useMemo, useState, Fragment } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Link from 'next/link';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';
import type { SeminarBase } from '../../types';

const MAX_COUNT = 3;

interface Props {
  school: string;
  year: number;
  month: number;
  events: Record<string, SeminarBase[]>;
  onChange(year: number, month: number): void;
}

function Calendar(props: Props): JSX.Element {
  const { school, year, month, events, onChange } = props;
  const [selected, setSelected] = useState('');
  const pivot = dayjs(new Date(year, month, 1));
  const seminar = useMemo(() => {
    const now = dayjs();
    let start = pivot.day(1);
    const end = pivot.endOf('month').add(7, 'day').day(0);
    const result = [];

    while (start < end) {
      const day = start.format('YYYY-MM-DD');
      const duration = start.diff(now);

      result.push({
        day,
        events: events[day] || [],
        properties: {
          isCurrentMonth: start.month() === month,
          isToday: duration > 0 && duration < 86400000,
        },
      });

      start = start.add(1, 'day');
    }

    return result;
  }, [pivot, month, events]);
  const rows = seminar.length / 7;
  const selectedDay = events[selected] || [];
  const handlePreviousMonth = () => {
    const lastMonth = pivot.subtract(1, 'month');

    onChange(lastMonth.year(), lastMonth.month());
  };
  const handleToday = () => {
    const now = dayjs();

    onChange(now.year(), now.month());
  };
  const handleNextMonth = () => {
    const lastMonth = pivot.add(1, 'month');

    onChange(lastMonth.year(), lastMonth.month());
  };

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <h1 className="text-lg font-semibold text-gray-900">
          <time dateTime={`${year}-${month + 1}`}>
            {year} 年 {month + 1} 月
          </time>
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              onClick={handlePreviousMonth}
            >
              <span className="sr-only">上个月</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
              onClick={handleToday}
            >
              今天
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              onClick={handleNextMonth}
            >
              <span className="sr-only">下个月</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <Menu.Button
                type="button"
                className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                月视图
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          日视图
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          周视图
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          月视图
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          年视图
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              添加
            </button>
          </div>
        </div>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">星期</span>一
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">星期</span>二
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">星期</span>三
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">星期</span>四
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">星期</span>五
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">星期</span>六
          </div>
          <div className="bg-white py-2">
            <span className="sr-only sm:not-sr-only">星期</span>日
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className={`hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-${rows} lg:gap-px`}>
            {seminar.map(item => {
              const isSelected = selected === item.day;

              return (
                <div
                  key={item.day}
                  className={classNames(
                    item.properties.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                    'relative py-2 px-3'
                  )}
                >
                  <time
                    dateTime={item.day}
                    className={classNames(
                      item.properties.isCurrentMonth ? 'cursor-pointer' : 'cursor-not-allowed',
                      item.properties.isToday || isSelected
                        ? `flex h-6 w-6 items-center justify-center rounded-full ${
                            isSelected ? 'bg-indigo-600' : 'bg-gray-400'
                          } font-semibold text-white`
                        : ''
                    )}
                    onClick={() => {
                      if (item.properties.isCurrentMonth) setSelected(item.day);
                    }}
                  >
                    {Number(item.day.split('-').at(-1))}
                  </time>
                  {item.events.length > 0 && (
                    <ol className="mt-2">
                      {item.events.slice(0, MAX_COUNT).map(event => (
                        <li key={event.id}>
                          <Link className="group flex" href={`/${school}/detail/${event.id}`}>
                            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                              {event.title}
                            </p>
                          </Link>
                        </li>
                      ))}
                      {item.events.length > MAX_COUNT && (
                        <li className="text-gray-500">还有 {item.events.length - MAX_COUNT} 个宣讲会</li>
                      )}
                    </ol>
                  )}
                </div>
              );
            })}
          </div>
          <div className={`isolate grid w-full grid-cols-7 grid-rows-${rows} gap-px lg:hidden`}>
            {seminar.map(item => {
              const isSelected = selected === item.day;

              return (
                <button
                  key={item.day}
                  type="button"
                  className={classNames(
                    item.properties.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                    (isSelected || item.properties.isToday) && 'font-semibold',
                    isSelected && 'text-white',
                    !isSelected && item.properties.isToday && 'text-indigo-600',
                    !isSelected && item.properties.isCurrentMonth && !item.properties.isToday && 'text-gray-900',
                    !isSelected && !item.properties.isCurrentMonth && !item.properties.isToday && 'text-gray-500',
                    'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10'
                  )}
                  onClick={() => setSelected(item.day)}
                >
                  <time
                    dateTime={item.day}
                    className={classNames(
                      isSelected && 'flex h-6 w-6 items-center justify-center rounded-full',
                      isSelected && item.properties.isToday && 'bg-indigo-600',
                      isSelected && !item.properties.isToday && 'bg-gray-900',
                      'ml-auto'
                    )}
                  >
                    {Number(item.day.split('-').at(-1))}
                  </time>
                  <span className="sr-only">{item.events.length} 个宣讲会</span>
                  {item.events.length > 0 && (
                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                      <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {selectedDay.length > 0 && (
        <div className="py-10 px-4 sm:px-6">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {selectedDay.map(event => (
              <li key={event.id} className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                <div className="flex-auto">
                  <Link href={`/${school}/detail/${event.id}`} className="font-semibold text-gray-900">
                    {event.title}
                  </Link>
                  <time dateTime={selected} className="mt-2 flex items-center text-gray-700">
                    <ClockIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    {selected}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default Calendar;
