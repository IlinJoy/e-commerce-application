import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

import { fetchFromApi } from '@/api/platform-api';
import { Profile } from '@/components/profile/profile';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

const mockCustomer = {
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '2000-01-01',
  version: 1,
};

const mockShowToast = vi.fn();

vi.mock('@/api/platformApi', () => ({ fetchFromApi: vi.fn() }));

vi.mock('@/context/toast-provider', () => ({ useToast: () => ({ showToast: mockShowToast }) }));

vi.mock('@/context/token-context', () => ({ useToken: () => ({ token: 'dummy-token', updateToken: vi.fn() }) }));

vi.mock('@/components/profile/password-modal', () => ({
  PasswordChangeDialog: (props: any) => (
    <div data-testid="password-change-dialog">
      {props.open ? 'Dialog Open' : 'Dialog Closed'}
      <button onClick={props.onClose}>Close</button>
    </div>
  ),
}));

describe('Profile', () => {
  it('loads and displays profile data', async () => {
    (fetchFromApi as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockCustomer);

    render(<Profile />, { wrapper: Providers });

    const emailInput = await screen.findByLabelText(/email/i);
    expect((emailInput as HTMLInputElement).value).toBe(mockCustomer.email);
    expect(screen.getByLabelText(/first name/i)).toHaveValue(mockCustomer.firstName);
    expect(screen.getByLabelText(/last name/i)).toHaveValue(mockCustomer.lastName);
    expect(screen.getByLabelText(/date of birth/i)).toHaveValue(mockCustomer.dateOfBirth);
  });

  it('toggles edit mode', async () => {
    (fetchFromApi as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockCustomer);

    render(<Profile />, { wrapper: Providers });

    await screen.findByLabelText(/email/i);

    expect(screen.getByLabelText(/email/i)).toBeDisabled();

    fireEvent.click(screen.getByLabelText(/edit personal info/i));

    expect(screen.getByLabelText(/email/i)).not.toBeDisabled();
  });

  it('opens and closes the change password dialog', async () => {
    (fetchFromApi as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockCustomer);

    render(<Profile />, { wrapper: Providers });

    const changePwdBtn = screen.getByRole('button', { name: /change password/i });

    await act(async () => {
      fireEvent.click(changePwdBtn);
    });

    await waitFor(() => {
      expect(screen.getByTestId('password-change-dialog')).toHaveTextContent('Dialog Open');
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Close'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('password-change-dialog')).toHaveTextContent('Dialog Closed');
    });
  });

  it('saves changes and shows success', async () => {
    (fetchFromApi as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockCustomer);
    (fetchFromApi as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockCustomer);
    (fetchFromApi as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockCustomer);

    render(<Profile />, { wrapper: Providers });

    await screen.findByLabelText(/email/i);

    fireEvent.click(screen.getByLabelText(/edit personal info/i));

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'newemail@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
    });

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
  });

  it('shows an error when saving fails', async () => {
    (fetchFromApi as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockCustomer);
    (fetchFromApi as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockCustomer);
    (fetchFromApi as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Update failed'));

    render(<Profile />, { wrapper: Providers });

    await screen.findByLabelText(/email/i);

    fireEvent.click(screen.getByLabelText(/edit personal info/i));
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(expect.objectContaining({ message: 'Update failed', isError: true }));
    });
  });
});
