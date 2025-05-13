import { fetchLoggedInCustomer } from '@/api/clientAuth';
import { ROUTES } from '@/router/routes';
import { ERROR_MESSAGES } from '@/utils/constants/messages';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router';

interface AuthContextType {
  token: string;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: '',
  onLogin: () => {},
  onLogout: () => {},
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const onLogin = async (email: string, password: string) => {
    const data = await fetchLoggedInCustomer(email, password);
    if (!data) {
      throw new Error(ERROR_MESSAGES.LOGIN_FAIL);
    }
    setToken(data.customerToken);
    navigate(ROUTES.MAIN.path);
  };

  const onLogout = () => {
    setToken('');
  };

  return <AuthContext.Provider value={{ token, onLogin, onLogout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
