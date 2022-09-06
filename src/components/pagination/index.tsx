import React, { Fragment, useCallback } from 'react';
import classNames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

interface Props {
  current: number;
  total: number;
  pageSize: number;
  onChange(page: number): void;
}

function generateArray(start: number, end: number): number[] {
  return Array.from(new Array(end + 1).keys()).slice(start);
}

function getPageList(current: number, totalPage: number): number[] {
  const count = 9;
  const border = {
    previous: (count - 1) / 2,
    next: totalPage - (count - 3) / 2,
  };

  if (totalPage <= count) {
    return generateArray(1, totalPage);
  }

  if (current <= border.previous || current >= border.next) {
    return generateArray(1, 4).concat(generateArray(totalPage - 3, totalPage));
  }

  return generateArray(1, current === border.previous + 1 ? 3 : 2).concat(generateArray(current - 1, current + 1), generateArray(current === border.next - 1 ? totalPage - 2 : totalPage - 1, totalPage));
}

function Pagination(props: Props): JSX.Element | null {
  const { current, total, pageSize, onChange } = props;
  const end = (current - 1) * pageSize + pageSize;
  const cursor = {
    begin: (current - 1) * pageSize + 1,
    end: end > total ? total : end,
  };
  const totalPage = Math.ceil(total / pageSize);
  const canPrevious = current > 1;
  const canNext = current < totalPage;
  const pageList = getPageList(current, totalPage);
  const handleChange = useCallback((page: number) => {
    if (page >=1 && page <= totalPage) onChange(page);
  }, [totalPage, onChange]);

  if (total === 0) {
    return null;
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <div
          onClick={() => handleChange(current - 1)}
          className={classNames('relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white', canPrevious ? 'text-gray-700 hover:bg-gray-50 cursor-pointer' : 'text-gray-400 cursor-not-allowed')}
        >
          上一页
        </div>
        <div
          onClick={() => handleChange(current + 1)}
          className={classNames('ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white', canNext ? 'text-gray-700 hover:bg-gray-50 cursor-pointer' : 'text-gray-400 cursor-not-allowed')}
        >
          下一页
        </div>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            显示第 <span className="font-medium">{cursor.begin}</span> 至第 <span className="font-medium">{cursor.end}</span> 个，共 <span className="font-medium">{total}</span> 个宣讲会
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <div
              onClick={() => handleChange(current - 1)}
              className={classNames('relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium', canPrevious ? 'text-gray-500 hover:bg-gray-50 cursor-pointer' : 'text-gray-400 cursor-not-allowed')}
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {pageList.map((page, index) => {
              const needSeparate = index > 0 && page < pageList[index + 1] - 1;

              return (
                <Fragment key={page}>
                  <div
                    onClick={() => handleChange(page)}
                    aria-current="page"
                    className={classNames('relative inline-flex items-center justify-center w-10 py-2 border text-sm font-medium cursor-pointer', current === page ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50')}
                  >
                    {page}
                  </div>
                  {needSeparate ? (
                    <span className="relative inline-flex items-center justify-center w-10 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    …
                  </span>
                  ) : null}
                </Fragment>
              );
            })}
            <div
              onClick={() => handleChange(current + 1)}
              className={classNames('relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium', canNext ? 'text-gray-500 hover:bg-gray-50 cursor-pointer' : 'text-gray-400 cursor-not-allowed')}
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
