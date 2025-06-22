import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import styles from './price-block.module.scss';
import type { Price } from '@commercetools/platform-sdk';
import { mapPrices } from '@/utils/catalog-utils';

type PriceBlockProps = {
  price?: Price[];
};

export function PriceBlock({ price }: PriceBlockProps) {
  const { itemPrice, itemDiscountedPrice } = mapPrices(price);

  return (
    <div className={styles.footer}>
      <Typography
        className={clsx(styles.price, { [styles.old]: itemDiscountedPrice })}
        component="span"
      >{`$ ${itemPrice}`}</Typography>
      {itemDiscountedPrice && (
        <Typography component="span" className={styles.discountPrice}>{`$ ${itemDiscountedPrice}`}</Typography>
      )}
    </div>
  );
}
