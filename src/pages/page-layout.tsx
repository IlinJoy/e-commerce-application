import { Header } from '@/components/header/header';
import { LoginPage } from './login-page/login-page';

export function PageLayout() {
  return (
    <>
      <Header />
      <main>
        <LoginPage />
      </main>
      {/* <Footer /> */}
    </>
  );
}
