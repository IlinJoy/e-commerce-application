import { PageLayout } from '@/pages/page-layout';
import { Route, Routes } from 'react-router';
import { AccountPage } from '@/pages/account-page/account-page';
import { ROUTES } from './routes';
import { lazyLoad } from '@/utils/lazy-load';

const AboutPage = lazyLoad('about-page');
const CatalogPage = lazyLoad('catalog-page');
const LoginPage = lazyLoad('login-page');
const MainPage = lazyLoad('main-page');
const NotFoundPage = lazyLoad('not-found-page');
const RegistrationPage = lazyLoad('registration-page');

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<MainPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
        <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
