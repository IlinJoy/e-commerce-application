import { Header } from '@/components/header/header';
import { Outlet } from 'react-router';

export function PageLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
