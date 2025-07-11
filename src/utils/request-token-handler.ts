import { cookieHandler } from '@/services/cookies/cookie-handler';
import { getAnonymousToken } from '@/api/platform-api';

export const getRequestToken = async () => {
  const token = cookieHandler.get('token') || cookieHandler.get('anonToken') || (await handleAnonToken());
  return token;
};

export const handleAnonToken = async () => {
  try {
    const id = crypto.randomUUID();
    const anonToken = await getAnonymousToken(id);
    cookieHandler.set('anonToken', anonToken);
    return anonToken;
  } catch (error) {
    console.log(error);
    return '';
  }
};
