// expecting the key coming from url
// expecting token for anonymous user to be set somewhere else and be available here through context
// do we have a component Loader/Spinner/smth similar & same for "Something went wrong" (error)? At the moment, it's mocked
// !!!LAYOUT BUG: height of the main container doesn't take header height into account and therefore the content inside the main container is colliding with the header

import { getProductByKey } from '@/api/catalog';
import { useToken } from '@/context/token-context';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './product-page.module.scss';
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import clsx from 'clsx';

export const ProductPage = () => {
  const { token } = useToken();
  const pathSegments = window.location.pathname.split('/');
  const key = pathSegments[pathSegments.length - 1];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', key, token],
    queryFn: () => {
      console.log('Fetching product...');
      return getProductByKey(key, token);
    },
    enabled: !!key,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error when fetching product</div>;
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
