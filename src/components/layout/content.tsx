import React, { PropsWithChildren } from 'react';

function Content(props: PropsWithChildren<{}>): JSX.Element {
  return (
    <main className="-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">{props.children}</div>
      </div>
    </main>
  );
}

export default Content;
