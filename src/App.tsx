import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './router/app-router';
import { ThemeAppProvider } from './theme/provider/theme-provider';
import { responseTheme } from './theme/theme';
import { CustomerProvider } from './context/provider/customer-provider';
import { ToastContextProvider } from './context/toast-provider';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <CustomerProvider>
          <ThemeAppProvider theme={responseTheme}>
            <AppRouter />
          </ThemeAppProvider>
        </CustomerProvider>
      </ToastContextProvider>
    </QueryClientProvider>
  );
}
