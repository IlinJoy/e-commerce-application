import { Header } from './components/header/header';
import { LoginPage } from './pages/login-page/login-page';

export function App() {
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
