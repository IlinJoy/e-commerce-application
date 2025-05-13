import { Header } from '@/components/header/header';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

export function PageLayout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loader</div>}>
          <Outlet />
        </Suspense>
      </main>
      {/* <Footer /> */}
    </>
  );
}
