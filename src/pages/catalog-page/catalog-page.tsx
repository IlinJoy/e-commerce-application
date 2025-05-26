import { CatalogFilters } from '@/components/catalog-filters/catalog-filters';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import styles from './catalog-page.module.scss';
import Container from '@mui/material/Container';

export function CatalogPage() {
  return (
    <Container component={'section'} className={styles.layout}>
      <CatalogFilters />
      <div className={styles.listWrapper}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </Container>
  );
}
