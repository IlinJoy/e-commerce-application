export const ROUTES = {
  MAIN: '',
  LOGIN: 'login',
  REGISTRATION: 'registration',
  CATALOG: 'catalog',
  ABOUT: 'about',
  ACCOUNT: 'account',
  NOT_FOUND: '*',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
