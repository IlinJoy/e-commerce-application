export const tokenCookiesConfig = {
  key: 'token',
  options: {
    path: '/',
    secure: true,
    samesite: 'lax',
    maxAge: 162800,
  },
} as const;
