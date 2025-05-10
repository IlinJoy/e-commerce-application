import { AppRouter } from './router/app-router';
import { ThemeAppProvider } from './theme/provider/theme-provider';
import { responseTheme } from './theme/theme';

export function App() {
  return (
    <ThemeAppProvider theme={responseTheme}>
      <AppRouter />
    </ThemeAppProvider>
  );
}
