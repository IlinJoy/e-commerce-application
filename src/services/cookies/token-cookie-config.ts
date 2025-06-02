const baseOptions = {
  path: '/',
  secure: true,
  samesite: 'lax',
} as const;

export const tokenCookiesConfig = {
  key: 'token',
  options: {
    ...baseOptions,
    maxAge: 162800,
  },
} as const;

export const anonTokenCookiesConfig = {
  key: 'anonToken',
  options: {
    ...baseOptions,
    maxAge: 10000,
  },
};
