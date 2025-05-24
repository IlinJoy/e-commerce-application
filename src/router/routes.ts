export const ROUTES = {
  MAIN: {
    path: '',
    component: () => import('../pages/main-page/main-page').then((module) => ({ default: module.MainPage })),
  },
  LOGIN: {
    path: 'login',
    component: () => import('../pages/login-page/login-page').then((module) => ({ default: module.LoginPage })),
  },
  REGISTRATION: {
    path: 'registration',
    component: () =>
      import('../pages/registration-page/registration-page').then((module) => ({ default: module.RegistrationPage })),
  },
  CATALOG: {
    path: 'catalog',
    component: () => import('../pages/catalog-page/catalog-page').then((module) => ({ default: module.CatalogPage })),
  },
  ABOUT: {
    path: 'about',
    component: () => import('../pages/about-page/about-page').then((module) => ({ default: module.AboutPage })),
  },
  ACCOUNT: {
    path: 'account',
    component: () => import('../pages/account-page/account-page').then((module) => ({ default: module.AccountPage })),
  },
  NOT_FOUND: {
    path: '*',
    component: () =>
      import('../pages/not-found-page/not-found-page').then((module) => ({ default: module.NotFoundPage })),
  },
  CATALOG_LIST: {
    path: ':category',
    component: () =>
      import('../components/catalog-list/catalog-list').then((module) => ({ default: module.CatalogList })),
  },
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
