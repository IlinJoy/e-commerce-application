import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router';
import { ROUTES } from './routes';

type ProtectedRoutProps = {
  children?: ReactNode;
  isAllowed: boolean;
  redirectPath?: string;
};

export function ProtectedRoute({ isAllowed, redirectPath = ROUTES.MAIN.path, children }: ProtectedRoutProps) {
  console.log(isAllowed, redirectPath);

  if (!isAllowed) {
    return <Navigate to={'/' + redirectPath} replace />;
  }

  return children || <Outlet />;
}
