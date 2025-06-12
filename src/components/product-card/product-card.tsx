import { getDiscountPercent } from '@/utils/catalog-utils';
import type { ProductProjection } from '@commercetools/platform-sdk';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './product-card.module.scss';
import { LANG } from '@/utils/constants/filters';
import { HighlightedText } from '../highlighted-text/highlighted-text';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router/routes';
import { PriceBlock } from '../price-block/price-block';

type ProductCardProps = {
  product: ProductProjection;
};

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const {
    description,
    name,
    key,
    masterVariant: { images, prices },
  } = product;

  const image = images?.[0];
  const itemDescription = description?.[LANG] || '';
  const price = prices?.[0];
  const discountPercent = getDiscountPercent(price?.value.centAmount, price?.discounted?.value.centAmount);

  return (
    <Card className={styles.cardWrapper} variant="outlined">
      <CardActionArea onClick={() => navigate(`/${ROUTES.PRODUCT.base}/${key}`)}>
        {discountPercent && (
          <Typography className={styles.discount} component="span">{`-${discountPercent}%`}</Typography>
        )}

        <CardMedia component="img" height="380" image={image?.url} alt={image?.label} />

        <CardContent>
          <HighlightedText text={name[LANG]} isHeading />
          <HighlightedText text={itemDescription} />
          <PriceBlock price={prices} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
