import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { TokenContext } from './provider/contexts';
import { tokenCookieHandler } from '@/services/cookies/cookie-handler';

export function TokenContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromCookies = tokenCookieHandler.get() || '';
    setToken(tokenFromCookies);
  }, []);

  const updateToken = (token: string) => {
    setToken(token);
    tokenCookieHandler.set(token);
  };

  const resetToken = () => {
    setToken('');
    tokenCookieHandler.delete();
  };

  // const refreshToken=()=>{}? "expires_in": 172800,

  return <TokenContext.Provider value={{ token, resetToken, updateToken }}>{children}</TokenContext.Provider>;
}
