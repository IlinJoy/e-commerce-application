import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { TokenContext } from './provider/contexts';
import { tokenCookieHandler } from '@/services/cookies/cookie-handler';

export function TokenContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(tokenCookieHandler.get() || '');

  useEffect(() => {
    const tokenFromCookies = tokenCookieHandler.get() || '';
    setToken(tokenFromCookies);
  }, []);

  const handleUpdateToken = (token: string) => {
    setToken(token);
    tokenCookieHandler.set(token);
  };

  const handleResetToken = () => {
    setToken('');
    tokenCookieHandler.delete();
  };

  // const refreshToken=()=>{}? "expires_in": 172800,

  return (
    <TokenContext.Provider value={{ token, handleResetToken, handleUpdateToken }}>{children}</TokenContext.Provider>
  );
}
