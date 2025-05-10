import { PageLayout } from '@/pages/page-layout';
import { Route, Routes } from 'react-router';
import { AccountPage } from '@/pages/account-page/account-page';
import { ROUTES } from './routes';
import { lazy } from 'react';

const AboutPage = lazy(ROUTES.ABOUT.component);
const CatalogPage = lazy(ROUTES.CATALOG.component);
const LoginPage = lazy(ROUTES.LOGIN.component);
const MainPage = lazy(ROUTES.MAIN.component);
const NotFoundPage = lazy(ROUTES.NOT_FOUND.component);
const RegistrationPage = lazy(ROUTES.REGISTRATION.component);

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<MainPage />} />
        <Route path={ROUTES.LOGIN.path} element={<LoginPage />} />
        <Route path={ROUTES.REGISTRATION.path} element={<RegistrationPage />} />
        <Route path={ROUTES.CATALOG.path} element={<CatalogPage />} />
        <Route path={ROUTES.ABOUT.path} element={<AboutPage />} />
        <Route path={ROUTES.ACCOUNT.path} element={<AccountPage />} />
        <Route path={ROUTES.NOT_FOUND.path} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
