import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './router/app-router';
import { ThemeAppProvider } from './theme/provider/theme-provider';
import { responseTheme } from './theme/theme';
import { CustomerProvider } from './context/provider/customer-provider';
import { ToastContextProvider, useToast } from './context/toast-provider';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function App() {
  const { showToast } = useToast();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        showToast({ message: error.message, isError: true });
      },
    }),
  });

  return (
    <ToastContextProvider>
      <QueryClientProvider client={queryClient}>
        <CustomerProvider>
          <ThemeAppProvider theme={responseTheme}>
            <AppRouter />
          </ThemeAppProvider>
        </CustomerProvider>
      </QueryClientProvider>
    </ToastContextProvider>
  );
}
