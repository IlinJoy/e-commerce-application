import type { PasswordAuthMiddlewareOptions } from '@commercetools/ts-client';
import { CTP_AUTH_URL, PROJECT_KEY } from '../utils/constants/api';
import { buildCustomerClient, ctpClient } from './sdkClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { requireEnv } from '../utils/require-env';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: PROJECT_KEY });

export const getCustomerApiRoot = (email: string, password: string) => {
  const options: PasswordAuthMiddlewareOptions = {
    host: CTP_AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: requireEnv('CLIENT_CLIENT_ID'),
      clientSecret: requireEnv('CLIENT_CLIENT_SECRET'),
      user: {
        username: email,
        password,
      },
    },
    scopes: requireEnv('CLIENT_SCOPES').split(' '),
    httpClient: fetch,
  };

  return createCustomerApiRoot(options);
};

const createCustomerApiRoot = (options: PasswordAuthMiddlewareOptions) => {
  const customerClient = buildCustomerClient(options);

  return createApiBuilderFromCtpClient(customerClient).withProjectKey({ projectKey: PROJECT_KEY });
};
