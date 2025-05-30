import { anonCookieHandler, tokenCookieHandler } from '@/services/cookies/cookie-handler';
import { ERROR_MESSAGES } from './constants/messages';
import { getAnonymousToken } from '@/api/platformApi';

export const getRequestToken = async () => {
  const token = tokenCookieHandler.get() || anonCookieHandler.get() || (await handleAnonToken());
  if (!token) {
    throw new Error(ERROR_MESSAGES.TOKEN_NOT_FOUND);
  }
  return token;
};

export const handleAnonToken = async () => {
  const isExist = anonCookieHandler.get();
  if (!isExist) {
    const id = crypto.randomUUID();
    const anonToken = await getAnonymousToken(id);
    anonCookieHandler.set(anonToken);
  }
};
