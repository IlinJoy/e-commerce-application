import { getProducts } from '@/api/catalog';
import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '../product-card/product-card';
import styles from './catalog-list.module.scss';

export function CatalogList() {
  const { filterParams } = useCatalogFilters();

  const { data, isFetching } = useQuery({
    queryKey: ['products', filterParams],
    queryFn: getProducts,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!data) {
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
