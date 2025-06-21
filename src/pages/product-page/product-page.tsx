import { getProductByKey } from '@/api/catalog';
import { useQuery } from '@tanstack/react-query';
import styles from './product-page.module.scss';
import { getProductIdFromUrl } from '@/utils/getProductKeyFromUrl';
import { NotFoundPage } from '../not-found-page/not-found-page';
import Typography from '@mui/material/Typography';
import { ProductImageBlock } from '@/components/product-image-block/product-image-block';
import { PriceBlock } from '@/components/price-block/price-block';
import Button from '@mui/material/Button';
import { Loader } from '@/components/loader/loader';
import CheckIcon from '@mui/icons-material/Check';
import { useProductActions } from '@/hooks/use-product-actions';

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

  const { inCart, loading, handleAddToCart, handleRemoveFromCart } = useProductActions(
    data?.id,
    data?.masterVariant.id
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <NotFoundPage />;
  }

  const images = data?.masterVariant?.images;
  const prices = data?.masterVariant?.prices;

  return (
    <article className={styles.product}>
      {images && <ProductImageBlock images={images} />}
      <div>
        <div className={styles.content}>
          <Typography variant="h4" component="h2">
            {data?.name['en-US']}
          </Typography>
          <PriceBlock price={prices} />
          <Typography className={styles.description}>{data?.description?.['en-US']}</Typography>
        </div>

        <div className={styles.buttonsWrapper}>
          {!inCart ? (
            <Button onClick={handleAddToCart} className={styles.addBtn} disabled={loading}>
              Add to cart
            </Button>
          ) : (
            <>
              <div className={styles.inCartWrapper}>
                <CheckIcon className={styles.checkIcon} /> In cart
              </div>
              <Button onClick={handleRemoveFromCart} className={styles.removeBtn} disabled={loading}>
                Remove from cart
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};
