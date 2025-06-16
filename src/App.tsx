import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './router/app-router';
import { ThemeAppProvider } from './theme/provider/theme-provider';
import { responseTheme } from './theme/theme';
import { CustomerProvider } from './context/provider/customer-provider';
import { ToastContextProvider } from './context/toast-provider';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 6000,
      refetchOnMount: false,
    },
  },
});

export function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

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
