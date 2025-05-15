import { PageLayout } from '@/pages/page-layout';
import { Route, Routes } from 'react-router';
import { AccountPage } from '@/pages/account-page/account-page';
import { ROUTES } from './routes';
import { lazy } from 'react';
import { ProtectedRoute } from './protected-rout';
import { useToken } from '@/hooks/use-auth';

const AboutPage = lazy(ROUTES.ABOUT.component);
const CatalogPage = lazy(ROUTES.CATALOG.component);
const LoginPage = lazy(ROUTES.LOGIN.component);
const MainPage = lazy(ROUTES.MAIN.component);
const NotFoundPage = lazy(ROUTES.NOT_FOUND.component);
const RegistrationPage = lazy(ROUTES.REGISTRATION.component);

export function AppRouter() {
  const { token } = useToken();

  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<MainPage />} />
        <Route path={ROUTES.CATALOG.path} element={<CatalogPage />} />
        <Route path={ROUTES.ABOUT.path} element={<AboutPage />} />
        <Route path={ROUTES.NOT_FOUND.path} element={<NotFoundPage />} />

        <Route element={<ProtectedRoute isAllowed={!token} />}>
          <Route path={ROUTES.LOGIN.path} element={<LoginPage />} />
          <Route path={ROUTES.REGISTRATION.path} element={<RegistrationPage />} />
        </Route>

        <Route
          path={ROUTES.ACCOUNT.path}
          element={
            <ProtectedRoute isAllowed={!!token}>
              <AccountPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
