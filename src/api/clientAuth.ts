import { CustomerDraft } from '@commercetools/platform-sdk'
import { apiRoot } from './platformApi'

const registerCustomer = async (customerData: CustomerDraft) => {
  const response = await apiRoot
    .withProjectKey({ projectKey: process.env.CTP_PROJECT_KEY! })
    .customers()
    .post({ body: customerData })
    .execute()

  return response.body
}


const loginCustomer = async (email, password) => {

  const basicAuth = btoa(`${process.env.CLIENT_CLIENT_ID}:${process.env.CLIENT_CLIENT_SECRET}`);

  const response = await fetch(`${process.env.CLIENT_AUTH_URL}/oauth/${process.env.CLIENT_PROJECT_KEY}/customers/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "password",
      username: email,
      password: password,
      scope: "manage_my_quote_requests:frontend-first-project manage_my_payments:frontend-first-project manage_my_profile:frontend-first-project manage_my_quotes:frontend-first-project view_published_products:frontend-first-project manage_my_orders:frontend-first-project manage_my_shopping_lists:frontend-first-project",
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

  const response = await fetch("https://auth.us-central1.gcp.commercetools.com/oauth/token", {
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