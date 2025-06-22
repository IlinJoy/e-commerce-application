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
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import { useProductActions } from '@/hooks/use-product-actions';

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

  const { inCart, loading, handleAddToCart, handleRemoveFromCart } = useProductActions(
    product.id,
    product.masterVariant.id
  );

  return (
    <Card className={styles.cardWrapper} variant="outlined">
      <CardActionArea className={styles.cardActionArea} onClick={() => navigate(`/${ROUTES.PRODUCT.base}/${key}`)}>
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
    </Card>
  );
}
