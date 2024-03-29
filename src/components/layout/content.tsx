import React, { useEffect, useState, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import Loading from '../loading';

const height = 'calc(100vh - 203px)';

function Content(props: PropsWithChildren<{}>): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.on('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <main className="-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white rounded-lg shadow" style={{ minHeight: height }}>
          {loading ? <Loading height={height} /> : props.children}
        </div>
      </div>
    </main>
  );
}

export default Content;
