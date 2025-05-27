import { mapPrices } from '@/utils/catalog-utils';
import type { ProductProjection } from '@commercetools/platform-sdk';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './product-card.module.scss';
import clsx from 'clsx';

type ProductCardProps = {
  product: ProductProjection;
};

export function ProductCard({ product }: ProductCardProps) {
  const {
    description,
    name,
    masterVariant: { images, prices },
  } = product;

  const image = images?.[0];
  const itemDescription = description?.['en-US'];
  const { itemPrice, hasDiscount, ...discountInfo } = mapPrices(prices);

  return (
    <Card className={styles.cardWrapper} variant="outlined">
      <CardActionArea>
        {hasDiscount && (
          <Typography className={styles.discount} component="span">{`-${discountInfo.discountPercent}%`}</Typography>
        )}

        <CardMedia component="img" height="380" image={image?.url} alt={image?.label} />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name['en-US']}
          </Typography>
          <Typography variant="body1" className={styles.description}>
            {itemDescription}
          </Typography>

          <div className={styles.footer}>
            <Typography
              className={clsx(styles.price, { [styles.old]: hasDiscount })}
              component="span"
            >{`$ ${itemPrice}`}</Typography>
            {hasDiscount && (
              <Typography
                component="span"
                className={styles.discountPrice}
              >{`$ ${discountInfo.itemDiscountedPrice}`}</Typography>
            )}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
