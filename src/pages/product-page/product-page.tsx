import { getProductByKey } from '@/api/catalog';
import { useQuery } from '@tanstack/react-query';
import styles from './product-page.module.scss';
import clsx from 'clsx';
import { getProductIdFromUrl } from '@/utils/getProductKeyFromUrl';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { ProductLightbox } from '@/components/lightbox/lightbox';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import type { Image } from '@commercetools/platform-sdk';
import { smallCardOffset } from '@/utils/constants/ui';

export const ProductPage = () => {
  const id = getProductIdFromUrl() || '';
  const [slideIndex, setSlideIndex] = useState(0);

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
  const combineImagesForPreview = (images: Image[]) => [...images, ...images, ...images];

  return (
    <article className={styles.product}>
      {images && (
        <div className={styles.imageWrapper}>
          <div className={styles.imageTrack} style={{ transform: `translateY(-${slideIndex * smallCardOffset}px)` }}>
            {combineImagesForPreview(images).map((image) => (
              <img key={image.url} src={image.url} alt={image.label} className={styles.smallImage} />
            ))}
          </div>
          <div className={styles.lightboxWrapper}>
            <ProductLightbox images={images} setSlideIndex={setSlideIndex} slideIndex={slideIndex} />

            <div className={styles.stepsWrapper}>
              {images.map((item) => (
                <span key={item.label} className={styles.steps} />
              ))}
            </div>
          </div>
        </div>
      )}
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
