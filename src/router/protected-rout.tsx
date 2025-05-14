import type { ReactNode } from 'react';
import { ROUTES } from './routes';
import { Navigate, Outlet } from 'react-router';

type ProtectedRoutProps = {
  children?: ReactNode;
  isAllowed: boolean;
  redirectPath?: string;
};

export function ProtectedRoute({ isAllowed, redirectPath = ROUTES.MAIN.path, children }: ProtectedRoutProps) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
}
