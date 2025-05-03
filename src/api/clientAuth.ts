// ./adminToken — сервер получает project token для создания пользователя
// registerCustomer — сервер регистрирует пользователя (токен технический, приходит от adminToken)
// loginCustomer — клиент логинит пользователя и получает:
// access_token
// refresh_token
// expires_in
// access_token истекает → frontend вызывает refresh (без логина, только refresh_token и client credentials) и получает те же данные, что и loginCustomer (данные надо обновить)

import { CLIENT_CLIENT_ID, CLIENT_CLIENT_SECRET, CLIENT_PROJECT_KEY, CLIENT_AUTH_URL } from "../utils/constants";

type CustomerData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const registerCustomer = async (token, customerData: CustomerData) => {
  const response = await fetch("https://api.us-central1.gcp.commercetools.com/frontend-first-project/customers", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Ошибка регистрации:", data);
    throw new Error("Signup failed");
  }

  console.log("Пользователь зарегистрирован:", data);
  return data;
};

const loginCustomer = async (email, password) => {

  const basicAuth = btoa(`${CLIENT_CLIENT_ID}:${CLIENT_CLIENT_SECRET}`);

  const response = await fetch(`${CLIENT_AUTH_URL}/oauth/${CLIENT_PROJECT_KEY}/customers/token`, {
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
  const basicAuth = btoa(`${CLIENT_CLIENT_ID}:${CLIENT_CLIENT_SECRET}`);

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