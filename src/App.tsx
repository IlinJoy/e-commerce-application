import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/auth-context';
import { AppRouter } from './router/app-router';
import { ThemeAppProvider } from './theme/provider/theme-provider';
import { responseTheme } from './theme/theme';

export function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeAppProvider theme={responseTheme}>
          <AppRouter />
        </ThemeAppProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
