import { PageLayout } from './pages/page-layout';
import { ThemeAppProvider } from './theme/provider/theme-provider';
import { responseTheme } from './theme/theme';

export function App() {
  return (
    <ThemeAppProvider theme={responseTheme}>
      <PageLayout />
    </ThemeAppProvider>
  );
}
