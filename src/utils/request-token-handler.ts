import { anonCookieHandler, tokenCookieHandler } from '@/services/cookies/cookie-handler';
import { ERROR_MESSAGES } from './constants/messages';

export const getRequestToken = () => {
  const token = tokenCookieHandler.get() || anonCookieHandler.get();
  if (!token) {
    throw new Error(ERROR_MESSAGES.TOKEN_NOT_FOUND);
  }
  return token;
};
