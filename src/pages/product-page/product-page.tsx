import { getProductByKey } from '@/api/catalog';
import { useQuery } from '@tanstack/react-query';
import styles from './product-page.module.scss';
import clsx from 'clsx';
import { getProductIdFromUrl } from '@/utils/getProductKeyFromUrl';
import { NotFoundPage } from '../not-found-page/not-found-page';
import Typography from '@mui/material/Typography';
import { ProductImageBlock } from '@/components/product-image-block/product-image-block';

export const ProductPage = () => {
  const id = getProductIdFromUrl() || '';

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return getProductByKey(id);
    },
    enabled: !!id,
    retry: 1,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <NotFoundPage />;
  }

  const images = data?.masterVariant?.images;
  const discount = data?.masterVariant?.prices?.[0]?.discounted?.value?.centAmount;

  return (
    <article className={styles.product}>
      {images && <ProductImageBlock images={images} />}
      <div>
        <Typography variant="h2">{data?.name['en-US']}</Typography>
        <p>
          <span className={clsx(discount && styles.discount)}>
            {data?.masterVariant?.prices?.[0]?.value?.centAmount}{' '}
            {data?.masterVariant?.prices?.[0]?.value?.currencyCode}
          </span>
          {discount && (
            <span className={styles.newPrice}>
              {` ${discount} ${data?.masterVariant?.prices?.[0]?.value?.currencyCode} `}
            </span>
          )}
        </p>
        <Typography>{data?.description?.['en-US']}</Typography>
      </div>
    </article>
  );
};
