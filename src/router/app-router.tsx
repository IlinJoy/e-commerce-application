import { AboutPage } from '@/pages/about-page/about-page';
import { CatalogPage } from '@/pages/catalog-page/catalog-page';
import { LoginPage } from '@/pages/login-page/login-page';
import { MainPage } from '@/pages/main-page/main-page';
import { NotFoundPage } from '@/pages/not-found-page/not-found-page';
import { PageLayout } from '@/pages/page-layout';
import { RegistrationPage } from '@/pages/registration-page/registration-page';
import { Route, Routes } from 'react-router';
import { ROUTES } from './routes';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<MainPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
        <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
