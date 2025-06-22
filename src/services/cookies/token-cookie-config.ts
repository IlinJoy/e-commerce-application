const baseOptions = {
  path: '/',
  secure: true,
  samesite: 'lax',
} as const;

export type CookieConfigOptions = typeof baseOptions & { maxAge: number };

export const cookieConfig = {
  token: {
    ...baseOptions,
    maxAge: 162800,
  },
  anonToken: {
    ...baseOptions,
    maxAge: 10000,
  },
} as const;
