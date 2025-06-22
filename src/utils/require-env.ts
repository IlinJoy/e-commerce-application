import { ERROR_MESSAGES } from './constants/messages';

export const requireEnv = (key: string) => {
  const env = process.env[key];

  if (!env) {
    throw new Error(ERROR_MESSAGES.ENV_NOT_FOUND(key));
  }
  return env;
};
