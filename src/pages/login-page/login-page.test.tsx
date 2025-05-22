import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginPage } from '@/pages/login-page/login-page';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

vi.mock('@/hooks/use-auth', () => ({ useAuth: () => ({ onLogin: vi.fn() }) }));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe('LoginPage', () => {
  it('renders form with email and password inputs', () => {
    render(<LoginPage />, { wrapper: Providers });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('disables submit button when form is invalid', () => {
    render(<LoginPage />, { wrapper: Providers });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).toBeDisabled();
  });

  it('enables submit button when form is valid', async () => {
    render(<LoginPage />, { wrapper: Providers });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Test123!' },
    });

    await waitFor(() => {
      expect(submitBtn).toBeEnabled();
    });
  });
});
