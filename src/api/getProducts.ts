import { CLIENT_AUTH_URL, CLIENT_CLIENT_ID, CLIENT_CLIENT_SECRET } from "../utils/constants";

// getCatalogToken — получение токена для каталога
// getProducts — получение продуктов с использованием токена, полученного на предыдущем шаге

const getCatalogToken = async () => {
  const credentials = btoa(`${CLIENT_CLIENT_ID}:${CLIENT_CLIENT_SECRET}`);

  const response = await fetch(`${CLIENT_AUTH_URL}/oauth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "view_published_products:frontend-first-project",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Ошибка авторизации (каталог):", data);
    throw new Error("Catalog token fetch failed");
  }

  return data.access_token;
};

const getProducts = async () => {
  const token = await getCatalogToken();

  const response = await fetch("https://api.us-central1.gcp.commercetools.com/frontend-first-project/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
};

export { getProducts };