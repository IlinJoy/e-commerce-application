import { MainPage } from '@/pages/main-page/main-page';
import type { ComponentType } from 'react';
import { lazy } from 'react';

//оставить или заменить на loadable/component
export const lazyLoad = <T>(path: string) => {
  return lazy(() =>
    import(`./pages/${path}/${path}`)
      .then((module: { [key: string]: ComponentType<T> }) => {
        const moduleExport = Object.keys(module)[0];
        return { default: module[moduleExport] };
      })
      .catch(() => ({ default: MainPage }))
  );
};
