import { getProductsWithFilters } from '@/api/catalog';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '../product-card/product-card';
import styles from './catalog-list.module.scss';
import { useOutletContext } from 'react-router';
import { createFilterString } from '@/utils/catalog-utils';

export function CatalogList() {
  const activeCategoryId = useOutletContext<string>();
  const shouldFetch = activeCategoryId !== null;
  const filterString = createFilterString({ category: activeCategoryId });

  const { data, isFetching } = useQuery({
    queryKey: ['products', filterString],
    queryFn: () => getProductsWithFilters(filterString),
    enabled: shouldFetch,
    retry: 1,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!data?.length) {
    return <div>Nothing here</div>;
  }

  return (
    <div className={styles.cardsWrapper}>
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
