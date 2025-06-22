import { getProductsWithFilters } from '@/api/catalog';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '../product-card/product-card';
import styles from './catalog-list.module.scss';
import { useLocation, useOutletContext } from 'react-router';
import { createQueryString, LIMIT_CARDS_ON_PAGE } from '@/utils/query-utils';
import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import { NothingFound } from '../nothing-found/nothing-found';
import { Loader } from '../loader/loader';
import { PaginationSection } from '../pagination-section/pagination-section';

type OutletContext = {
  activeCategory: string | null;
};

export function CatalogList() {
  const { activeCategory } = useOutletContext<OutletContext>();
  const { filterParams } = useCatalogFilters();
  const shouldFetch = activeCategory !== null;

  const queryParams = new URLSearchParams(useLocation().search);
  const page = Number(queryParams.get('page') || 1);
  const limit = Number(queryParams.get('limit') || LIMIT_CARDS_ON_PAGE);

  const { data, isPending } = useQuery({
    queryKey: ['products', activeCategory, filterParams, page, limit],
    queryFn: async () => {
      const queryString = createQueryString({
        category: activeCategory,
        filterParams,
        page,
        limit,
      });
      return await getProductsWithFilters(queryString);
    },
    enabled: shouldFetch,
    staleTime: 2000,
  });

  if (isPending) {
    return <Loader />;
  }

  if (!data?.result.length) {
    return <NothingFound message={'Try searching again!'} />;
  }

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;

  return (
    <div className={styles.cardsWrapper}>
      {data.result.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <PaginationSection currentPage={page} totalPages={totalPages} limit={limit} />
    </div>
  );
}
