import { render, screen, waitFor } from '@testing-library/react';
import { PageLayout } from './page-layout';
import { MemoryRouter, Route, Routes } from 'react-router';
import { act, lazy, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe('PageLayout', () => {
  it('should render with header', () => {
    render(<PageLayout />, { wrapper: Providers });

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should show loading while suspense', async () => {
    const AsyncComponent = lazy(() =>
      new Promise((resolve) => setTimeout(resolve, 0)).then(() => ({ default: () => <div>page</div> }))
    );

    const TestLayout = () => (
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<AsyncComponent />} />
        </Route>
      </Routes>
    );

    await act(async () => {
      render(<TestLayout />, { wrapper: Providers });
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByText('page')).toBeInTheDocument();
    });
  });
});
