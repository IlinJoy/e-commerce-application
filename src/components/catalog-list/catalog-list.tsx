import { getProductsWithFilters } from '@/api/catalog';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '../product-card/product-card';
import styles from './catalog-list.module.scss';
import { useOutletContext } from 'react-router';
import { createQueryString } from '@/utils/query-utils';
import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import { NothingFound } from '../nothing-found/nothing-found';

type OutletContext = {
  activeCategory: string | null;
};

export function CatalogList() {
  const { activeCategory } = useOutletContext<OutletContext>();
  const { filterParams } = useCatalogFilters();
  const shouldFetch = activeCategory !== null;

  const { data, isPending } = useQuery({
    queryKey: ['products', activeCategory, filterParams],
    queryFn: async () => {
      const queryString = createQueryString({
        category: activeCategory,
        filterParams,
      });
      return await getProductsWithFilters(queryString);
    },
    enabled: shouldFetch,
    staleTime: 2000,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data?.result.length) {
    return <NothingFound />;
  }

  return (
    <div className={styles.cardsWrapper}>
      {data.result.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
