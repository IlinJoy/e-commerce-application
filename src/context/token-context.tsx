import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { TokenContext } from './provider/contexts';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router/routes';

export function TokenContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleUpdateToken = (token: string) => {
    setToken(token);
    navigate(ROUTES.MAIN.path, { replace: true });
    //добавить в куки
  };

  const handleResetToken = () => {
    setToken('');
    //убрать из кук
  };

  useEffect(() => {
    const tokenFromCookies = '';
    if (tokenFromCookies) {
      setToken(tokenFromCookies);
    }
  }, []);

  // const refreshToken=()=>{}? "expires_in": 172800,

  return (
    <TokenContext.Provider value={{ token, handleResetToken, handleUpdateToken }}>{children}</TokenContext.Provider>
  );
}
