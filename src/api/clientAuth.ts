import { CustomerDraft, ClientRequest, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/ts-client';
import fetch from 'node-fetch';
import { ctpClient } from './sdkClient.js';
import { CTP_AUTH_URL, CTP_API_URL, PROJECT_KEY } from '../utils/constants.js';

const registerCustomer = async (customerData: CustomerDraft) => {
  const request: ClientRequest = {
    method: 'POST',
    uri: `/${PROJECT_KEY}/customers`,
    body: customerData,
  };

  const response = await ctpClient.execute(request);
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

  const request: ClientRequest = {
    method: 'GET',
    uri: `/${PROJECT_KEY}/me`,
  };

  try {
    const response = await client.execute(request);
    return {
      customer: response.body,
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login error');
  }
};

export { registerCustomer, loginCustomer };
