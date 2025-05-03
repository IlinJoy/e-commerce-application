import { CTP_AUTH_URL, CTP_CLIENT_ID, CTP_CLIENT_SECRET } from "../utils/constants";

const getToken = async () => {
  const credentials = btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`);

  const response = await fetch(CTP_AUTH_URL, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "manage_project:frontend-first-project",
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Ошибка авторизации:", error);
    throw new Error("Authorization failed");
  }

  const data = await response.json();
  console.log("Access Token:", data.access_token);
  return data.access_token;
};

export { getToken };