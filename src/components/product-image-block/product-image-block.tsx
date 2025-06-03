import { useState } from 'react';
import type { Image } from '@commercetools/platform-sdk';
import { smallCardOffset } from '@/utils/constants/ui';
import { ProductLightbox } from '@/components/lightbox/lightbox';
import styles from './product-image-block.module.scss';
import clsx from 'clsx';

export function ProductImageBlock({ images }: { images: Image[] }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const isSingle = images.length <= 1;
  const combineImagesForPreview = (images: Image[]) => [...images, ...images, ...images];

  return (
    <div className={styles.imageWrapper}>
      <div className={styles.imageMask}>
        <div className={styles.imageTrack} style={{ transform: `translateY(-${slideIndex * smallCardOffset}px)` }}>
          {isSingle ? (
            <img src={images[0].url} alt={images[0].label} className={styles.smallImage} />
          ) : (
            combineImagesForPreview(images).map((image, index) => (
              <img key={image.url + index} src={image.url} alt={image.label} className={styles.smallImage} />
            ))
          )}
        </div>
      </div>

      <div className={styles.lightboxWrapper}>
        <ProductLightbox images={images} setSlideIndex={setSlideIndex} slideIndex={slideIndex} />

        <div className={styles.stepsWrapper}>
          {images.map((item, index) => (
            <span key={item.label} className={clsx(styles.steps, { [styles.active]: index === slideIndex })} />
          ))}
        </div>
      </div>
    </div>
  );
}
