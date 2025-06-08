import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './router/app-router';
import { ThemeAppProvider } from './theme/provider/theme-provider';
import { responseTheme } from './theme/theme';
import { CustomerProvider } from './context/provider/customer-provider';
import { ToastContextProvider, useToast } from './context/toast-provider';

export function App() {
  const { showToast } = useToast();

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
