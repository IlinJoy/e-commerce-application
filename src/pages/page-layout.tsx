import { Header } from '@/components/header/header';
import { Loader } from '@/components/loader/loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

export function PageLayout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      {/* <Footer /> */}
    </>
  );
}
