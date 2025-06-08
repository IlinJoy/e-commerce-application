import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import styles from './price-block.module.scss';

type PriceBlockProps = {
  hasDiscount: boolean;
  itemPrice: number;
  itemDiscountedPrice?: number;
};
export function PriceBlock({ hasDiscount, itemPrice, itemDiscountedPrice }: PriceBlockProps) {
  return (
    <div className={styles.footer}>
      <Typography
        className={clsx(styles.price, { [styles.old]: hasDiscount })}
        component="span"
      >{`$ ${itemPrice}`}</Typography>
      {hasDiscount && (
        <Typography component="span" className={styles.discountPrice}>{`$ ${itemDiscountedPrice}`}</Typography>
      )}
    </div>
  );
}
