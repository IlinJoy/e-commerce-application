import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navigation } from './navigation';

vi.mock('react-router', () => ({
  NavLink: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
}));

const mockAuth = { isLoggedIn: false };
vi.mock('@/hooks/use-auth', () => ({ useAuth: () => mockAuth }));

describe('Navigation', () => {
  beforeEach(() => {
    mockAuth.isLoggedIn = false;
  });

  it('renders navigation', () => {
    render(<Navigation isOpenMenu={false} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows auth links when not logged in', () => {
    render(<Navigation isOpenMenu={false} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Registration')).toBeInTheDocument();
  });

  it('hides auth links when logged in', () => {
    mockAuth.isLoggedIn = true;

    render(<Navigation isOpenMenu={false} />);
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Registration')).not.toBeInTheDocument();
  });
});
