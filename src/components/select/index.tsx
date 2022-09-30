import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import useStore from '../../store';
import { schools } from '../../const';

function Select(): JSX.Element {
  const options = Object.entries(schools);
  const { school, setSchool } = useStore();
  const schoolName = schools[school];

  return (
    <Listbox value={school} onChange={setSchool}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className="flex items-center py-1 px-2 -mx-2 -my-1 rounded hover:bg-black hover:bg-opacity-20 active:bg-opacity-40">
            <span>{schoolName}宣讲会</span>
            {open ? <ChevronUpIcon className="h-7 w-7 ml-2" /> : <ChevronDownIcon className="h-7 w-7 ml-2" />}
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Listbox.Options className="absolute mt-1 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {options.map(option => (
                <Listbox.Option
                  key={option[0]}
                  value={option[0]}
                  className={({ active }) =>
                    `relative select-none py-2 pl-10 pr-4 cursor-pointer ${
                      active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <Fragment>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium text-indigo-700' : 'font-normal'
                        }`}
                      >
                        {option[1]}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </Fragment>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}

export default Select;
