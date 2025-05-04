import { ClientBuilder, PasswordAuthMiddlewareOptions, type Client } from '@commercetools/ts-client';
import fetch from 'node-fetch';
import { config } from 'dotenv';
import { CTP_API_URL, CTP_AUTH_URL, PROJECT_KEY } from '../utils/constants';

config();

export const ctpClient: Client = new ClientBuilder()
  .withClientCredentialsFlow({
    host: CTP_AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID!,
      clientSecret: process.env.CTP_CLIENT_SECRET!,
    },
    scopes: [process.env.CTP_SCOPES!],
    httpClient: fetch,
  })
  .withHttpMiddleware({
    host: CTP_API_URL,
    httpClient: fetch,
  })
  .build();

export const buildCustomerClient = (options: PasswordAuthMiddlewareOptions) =>
  new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware({
      host: CTP_API_URL,
      httpClient: fetch,
    })
    .build();