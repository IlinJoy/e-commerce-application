import { Header } from '@/components/header/header';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

export function PageLayout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      {/* <Footer /> */}
    </>
  );
}
