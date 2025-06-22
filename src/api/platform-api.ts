import { CTP_API_URL, CTP_AUTH_URL, PROJECT_KEY } from '@/utils/constants/api';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const CLIENT_SCOPES = import.meta.env.VITE_CLIENT_SCOPES;

type ApiErrorResponse = {
  message?: string;
};

type TokenResponse = {
  access_token: string;
  error_description?: string;
};

const fetchToken = async (
  body: URLSearchParams,
  clientId: string,
  clientSecret: string,
  url: string = `${CTP_AUTH_URL}/oauth/token`
): Promise<string> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body,
  });

  const text = await response.text();

  let data: Partial<TokenResponse> = {};
  try {
    data = text ? (JSON.parse(text) as Partial<TokenResponse>) : {};
  } catch {
    // silently ignore JSON parse errors (e.g. empty 204 body)
  }

  if (!response.ok || !data.access_token) {
    const message = typeof data.error_description === 'string' ? data.error_description : 'Failed to get token';
    throw new Error(message);
  }

  return data.access_token;
};

export const getAdminToken = async () => {
  const params = new URLSearchParams();
  params.set('grant_type', 'client_credentials');
  params.set('scope', CLIENT_SCOPES);
  return fetchToken(params, CLIENT_ID, CLIENT_SECRET);
};

export const getCustomerToken = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.set('grant_type', 'password');
  params.set('username', username);
  params.set('password', password);
  params.set('scope', CLIENT_SCOPES);
  return fetchToken(params, CLIENT_ID, CLIENT_SECRET, `${CTP_AUTH_URL}/oauth/${PROJECT_KEY}/customers/token`);
};

export const getAnonymousToken = async (anonymousId: string) => {
  const params = new URLSearchParams();
  params.set('grant_type', 'client_credentials');
  params.set('scope', CLIENT_SCOPES);
  params.set('anonymous_id', anonymousId);

  return fetchToken(params, CLIENT_ID, CLIENT_SECRET, `${CTP_AUTH_URL}/oauth/${PROJECT_KEY}/anonymous/token`);
};

export const fetchFromApi = async <T = unknown>(path: string, token: string, options: RequestInit = {}): Promise<T> => {
  const sanitizedPath = path.replace(/^\/+/, '');
  const url = `${CTP_API_URL}/${PROJECT_KEY}/${sanitizedPath}`.replace(/([^:]\/)\/+/g, '$1');

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = (await res.json()) as T | ApiErrorResponse;

  if (!res.ok) {
    const err = data as ApiErrorResponse;
    throw new Error(err.message ?? 'API request failed');
  }

  return data as T;
};
