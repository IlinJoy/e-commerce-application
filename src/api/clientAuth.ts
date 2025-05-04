import { CustomerDraft, ClientRequest, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/ts-client';
import fetch from 'node-fetch';
import { CTP_AUTH_URL, CTP_API_URL, PROJECT_KEY } from '../utils/constants.js';
import { apiRoot } from './platformApi.js';

const registerCustomer = async (customerData: CustomerDraft) => {
  const response = await apiRoot
    .customers()
    .post({
      body: customerData,
    })
    .execute();

  return response.body;
};

const loginCustomer = async (email: string, password: string) => {
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

  const client = new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware({
      host: CTP_API_URL,
      httpClient: fetch,
    })
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey: PROJECT_KEY });

  try {
    const response = await apiRoot
      .me()
      .get()
      .execute();

    return {
      customer: response.body,
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login error');
  }
};

export { registerCustomer, loginCustomer };
