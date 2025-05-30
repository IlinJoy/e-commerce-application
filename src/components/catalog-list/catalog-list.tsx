import { getProductsWithFilters, getProductType } from '@/api/catalog';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '../product-card/product-card';
import styles from './catalog-list.module.scss';
import { useOutletContext } from 'react-router';
import { createQueryString } from '@/utils/query-utils';

type OutletContext = {
  activeCategory: string | null;
};

export function CatalogList() {
  const { activeCategory } = useOutletContext<OutletContext>();
  const shouldFetch = activeCategory !== null;

  const { data, isPending } = useQuery({
    queryKey: ['products', activeCategory],
    queryFn: async () => {
      const queryString = createQueryString({
        category: activeCategory,
      });
      return await getProductsWithFilters(queryString);
    },
    enabled: shouldFetch,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data?.result.length) {
    return <div>Nothing here</div>;
  }

  return (
    <div className={styles.cardsWrapper}>
      {data.result.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
