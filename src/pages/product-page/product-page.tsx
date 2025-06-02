import { getProductByKey } from '@/api/catalog';
import { useToken } from '@/context/token-context';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './product-page.module.scss';
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import clsx from 'clsx';
import { getProductIdFromUrl } from '@/utils/getProductKeyFromUrl';
import { NotFoundPage } from '../not-found-page/not-found-page';

export const ProductPage = () => {
  const { token } = useToken();
  const id = getProductIdFromUrl() || '';

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return getProductByKey(id, token);
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
      <h2>{data?.name['en-US']}</h2>
      <p>
        <span className={clsx(discount && styles.discount)}>
          {data?.masterVariant?.prices?.[0]?.value?.centAmount} {data?.masterVariant?.prices?.[0]?.value?.currencyCode}
        </span>
        {discount && (
          <span className={styles.newPrice}>
            {` ${discount} ${data?.masterVariant?.prices?.[0]?.value?.currencyCode} `}
          </span>
        )}
      </p>
      <p>{data?.description?.['en-US']}</p>

      {images && (
        <>
          <Lightbox
            index={index}
            on={{
              view: ({ index }) => setIndex(index),
              click: () => setOpen(true),
            }}
            slides={images.map((image) => ({
              src: image.url,
              alt: image.label,
            }))}
            plugins={[Inline]}
            inline={{
              style: {
                width: '100%',
                maxWidth: '800px',
                aspectRatio: '3 / 2',
                margin: '2rem auto',
                borderRadius: '12px',
                backgroundColor: '#000',
              },
            }}
            render={{
              ...(images.length <= 1 && {
                buttonPrev: () => null,
                buttonNext: () => null,
              }),
            }}
          />

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={images.map((image) => ({
              src: image.url,
              alt: image.label,
            }))}
            animation={{ fade: 250 }}
          />
        </>
      )}
    </article>
  );
};
