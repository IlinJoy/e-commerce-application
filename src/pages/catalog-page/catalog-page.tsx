import { CatalogFilters } from '@/components/catalog-filters/catalog-filters';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

export function CatalogPage() {
  return (
    <>
      <CatalogFilters />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
