import React, { ChangeEvent } from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  onChange(text: string): void;
}

function Search(props: Props): JSX.Element {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <form className={classNames(props.className, 'relative')} action="." onSubmit={e => e.preventDefault()}>
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      <input type="search" className="block shadow p-2 pl-10 w-full text-sm text-gray-900 bg-gray-100 rounded-lg focus:bg-white" autoComplete="off" placeholder="搜索" onChange={handleChange} />
    </form>
  );
}

export default Search;
