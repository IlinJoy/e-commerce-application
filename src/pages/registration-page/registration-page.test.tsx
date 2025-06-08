import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { RegistrationPage } from './registration-page';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe('RegistrationPage', () => {
  it('renders the registration form and Sign In link', () => {
    render(<RegistrationPage />, { wrapper: Providers });
    expect(screen.getByText(/Already have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('disables submit button when form is invalid', () => {
    render(<RegistrationPage />, { wrapper: Providers });
    const submitBtn = screen.getByRole('button', { name: /register/i });
    expect(submitBtn).toBeDisabled();
  });

  it('enables submit button when form is valid', async () => {
    render(<RegistrationPage />, { wrapper: Providers });

    const submitBtn = screen.getByRole('button', { name: /register/i });
    const user = userEvent.setup();

    // Personal info
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Test123!' } });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '1990-01-01' } });

    // Shipping address
    fireEvent.change(screen.getByLabelText(/shippingAddress street/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/shippingAddress city/i), { target: { value: 'New York' } });

    await user.click(screen.getByLabelText(/shippingAddress country/i));
    await user.click(screen.getByRole('option', { name: /USA/i }));

    fireEvent.change(screen.getByLabelText(/shippingAddress postal code/i), { target: { value: '10001' } });

    // Billing address
    fireEvent.change(screen.getByLabelText(/billingAddress street/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/billingAddress city/i), { target: { value: 'New York' } });

    await user.click(screen.getByLabelText(/billingAddress country/i));
    await user.click(screen.getByRole('option', { name: /USA/i }));

    fireEvent.change(screen.getByLabelText(/billingAddress postal code/i), { target: { value: '10001' } });

    await waitFor(() => {
      expect(submitBtn).toBeEnabled();
    });
  });
});
