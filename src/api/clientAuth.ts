import { CustomerDraft } from '@commercetools/platform-sdk'
import { apiRoot } from './platformApi'
import { CTP_AUTH_URL, PROJECT_KEY } from '../utils/constants'

const registerCustomer = async (customerData: CustomerDraft) => {
  const response = await apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .customers()
    .post({ body: customerData })
    .execute()

  return response.body
}


const loginCustomer = async (email, password) => {

  const basicAuth = btoa(`${process.env.CLIENT_CLIENT_ID}:${process.env.CLIENT_CLIENT_SECRET}`);

  const response = await fetch(`${CTP_AUTH_URL}/oauth/${PROJECT_KEY}/customers/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "password",
      username: email,
      password: password,
      scope: process.env.CLIENT_SCOPES!,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Login failed:", data);
    throw new Error("Login error");
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token
  };
};

const refreshAccessToken = async (refreshToken) => {
  const basicAuth = btoa(`${process.env.CLIENT_CLIENT_ID}:${process.env.CLIENT_CLIENT_SECRET}`);

  const response = await fetch(`${CTP_AUTH_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("🔁 Refresh failed:", data);
    throw new Error("Token refresh failed");
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
  };
};

export { registerCustomer, loginCustomer, refreshAccessToken };