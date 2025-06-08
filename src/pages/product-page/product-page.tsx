import { getProductByKey } from '@/api/catalog';
import { useQuery } from '@tanstack/react-query';
import styles from './product-page.module.scss';
import { getProductIdFromUrl } from '@/utils/getProductKeyFromUrl';
import { NotFoundPage } from '../not-found-page/not-found-page';
import Typography from '@mui/material/Typography';
import { ProductImageBlock } from '@/components/product-image-block/product-image-block';
import { mapPrices } from '@/utils/catalog-utils';
import { PriceBlock } from '@/components/price-block/price-block';

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
  const { itemPrice, itemDiscountedPrice, hasDiscount } = mapPrices(data?.masterVariant?.prices);

  return (
    <article className={styles.product}>
      {images && <ProductImageBlock images={images} />}
      <div className={styles.content}>
        <Typography variant="h4" component="h2">
          {data?.name['en-US']}
        </Typography>
        <PriceBlock hasDiscount={hasDiscount} itemPrice={itemPrice} itemDiscountedPrice={itemDiscountedPrice} />
        <Typography className={styles.description}>{data?.description?.['en-US']}</Typography>
      </div>
    </article>
  );
};
