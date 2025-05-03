import { createClient } from '@commercetools/sdk-client'
import {
  createAuthForClientCredentialsFlow,
  createHttpClient
} from '@commercetools/sdk-client-v2'
import { config } from 'dotenv';
import fetch from 'node-fetch' // for test purpose
import { CTP_API_URL, CTP_AUTH_URL, PROJECT_KEY } from '../utils/constants';

config();

const clientId = process.env.CTP_CLIENT_ID!;
const clientSecret = process.env.CTP_CLIENT_SECRET!;
const authUrl = CTP_AUTH_URL;
const apiUrl = CTP_API_URL;
const scopes = [process.env.CTP_SCOPES!];

const authMiddleware = createAuthForClientCredentialsFlow({
  host: authUrl,
  projectKey: PROJECT_KEY,
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
