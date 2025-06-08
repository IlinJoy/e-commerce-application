import { cookieHandler } from '@/services/cookies/cookie-handler';
import { ERROR_MESSAGES } from './constants/messages';
import { getAnonymousToken } from '@/api/platformApi';

export const getRequestToken = async () => {
  const token = cookieHandler.get('token') || cookieHandler.get('anonToken') || (await handleAnonToken());
  if (!token) {
    throw new Error(ERROR_MESSAGES.TOKEN_NOT_FOUND);
  }
  return token;
};

export const handleAnonToken = async () => {
  try {
    const id = crypto.randomUUID();
    const anonToken = await getAnonymousToken(id);
    cookieHandler.set('anonToken', anonToken);
  } catch (error) {
    console.log(error);
  }
};
