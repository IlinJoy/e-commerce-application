import { Route, Routes } from 'react-router';
import { PageLayout } from './pages/page-layout';
import { ThemeAppProvider } from './theme/provider/theme-provider';
import { responseTheme } from './theme/theme';
import { MainPage } from './pages/main-page/main-page';
import { LoginPage } from './pages/login-page/login-page';
import { RegistrationPage } from './pages/registration-page/registration-page';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { AboutPage } from './pages/about-page/about-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

export function App() {
  return (
    <ThemeAppProvider theme={responseTheme}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ThemeAppProvider>
  );
}
