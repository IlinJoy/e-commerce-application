import { PasswordAuthMiddlewareOptions } from '@commercetools/ts-client';
import { CTP_AUTH_URL, PROJECT_KEY } from '../utils/constants.js';
import { buildCustomerClient, ctpClient } from './sdkClient.js';
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: PROJECT_KEY });

export const getCustomerApiRoot = (email: string, password: string) => {
  const options: PasswordAuthMiddlewareOptions = {
    host: CTP_AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: process.env.CLIENT_CLIENT_ID!,
      clientSecret: process.env.CLIENT_CLIENT_SECRET!,
      user: {
        username: email,
        password,
      },
    },
    scopes: process.env.CLIENT_SCOPES!.split(' '),
    httpClient: fetch,
  };

  return createCustomerApiRoot(options);
};

const createCustomerApiRoot = (options) => {
  const customerClient = buildCustomerClient(options);

  return createApiBuilderFromCtpClient(customerClient)
    .withProjectKey({ projectKey: PROJECT_KEY });
};