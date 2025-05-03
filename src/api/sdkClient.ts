import { createClient } from '@commercetools/sdk-client'
import {
  createAuthForClientCredentialsFlow,
  createHttpClient
} from '@commercetools/sdk-client-v2'
import { config } from 'dotenv';

config();

const projectKey = process.env.CTP_PROJECT_KEY!;
const clientId = process.env.CTP_CLIENT_ID!;
const clientSecret = process.env.CTP_CLIENT_SECRET!;
const authUrl = process.env.CTP_AUTH_URL!;
const apiUrl = process.env.CTP_API_URL!;
const scopes = [process.env.CTP_SCOPES!];

import fetch from 'node-fetch' // for test purpose

const authMiddleware = createAuthForClientCredentialsFlow({
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
})


const httpMiddleware = createHttpClient({
  host: apiUrl,
  fetch,  // for test purpose
})


const ctpClient = createClient({
  middlewares: [authMiddleware, httpMiddleware],
});

export default ctpClient;
