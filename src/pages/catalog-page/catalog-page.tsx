import { CatalogFilters } from '@/components/catalog-filters/catalog-filters';
import { Suspense, useState } from 'react';
import { Outlet } from 'react-router';
import Container from '@mui/material/Container';
import { CatalogBreadcrumbs } from '@/components/breadcrumbs/breadcrumbs';
import styles from './catalog-page.module.scss';
import { SortFilter } from '@/components/sort-filter/sort-filter';

export function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <Container component={'section'}>
      <div className={styles.breadcrumbsWrapper}>
        <CatalogBreadcrumbs />
        <div>
          {/* <SearchInput /> */}
          <SortFilter />
        </div>
      </div>
      <div className={styles.catalogLayout}>
        <CatalogFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <div className={styles.listWrapper}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet context={{ activeCategory }} />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
