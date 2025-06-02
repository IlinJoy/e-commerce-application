import { CatalogFilters } from '@/components/catalog-filters/catalog-filters';
import { Suspense, useState } from 'react';
import { Outlet } from 'react-router';
import Container from '@mui/material/Container';
import { CatalogBreadcrumbs } from '@/components/breadcrumbs/breadcrumbs';
import { SortFilter } from '@/components/sort-filter/sort-filter';
import { SearchInput } from '@/components/search-filter/search-filter';
import styles from './catalog-page.module.scss';

export function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <Container component={'section'}>
      <div className={styles.breadcrumbsWrapper}>
        <CatalogBreadcrumbs />
      </div>
      <div className={styles.catalogLayout}>
        <CatalogFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <div className={styles.listWrapper}>
          <div className={styles.topRow}>
            <SearchInput />
            <SortFilter />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet context={{ activeCategory }} />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
