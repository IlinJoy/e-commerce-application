export const tokenCookiesConfig = {
  name: 'token',
  options: {
    path: '/',
    secure: true,
    samesite: 'lax',
    maxAge: 152800,
  },
} as const;
