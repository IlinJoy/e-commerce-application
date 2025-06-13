import { mapCartAttributes } from '@/utils/cart-utils';
import { LANG } from '@/utils/constants/filters';
import type { LineItem } from '@commercetools/platform-sdk';
import Typography from '@mui/material/Typography';
import { PriceBlock } from '../price-block/price-block';
import { QuantityInput } from '../quantity-input/quantity-input';
import IconButton from '@mui/material/IconButton';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import styles from './cart-card.module.scss';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router/routes';

type CartRowProps = {
  product: LineItem;
};

export function CartRow({ product }: CartRowProps) {
  const navigate = useNavigate();

  const variant = product.variant;
  const cover = variant.images?.[0];
  const attributes = mapCartAttributes(variant.attributes);

  return (
    <div className={styles.productRow}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={cover?.url} alt={cover?.label}></img>
      </div>

      <div className={styles.content}>
        <div className={styles.productInfo}>
          <Typography
            className={styles.name}
            variant="h5"
            component="div"
            onClick={() => navigate(`/${ROUTES.PRODUCT.base}/${product.productKey}`)}
          >
            {product.name[LANG]}
          </Typography>

          {attributes?.map((attr) => (
            <div key={attr.name}>
              {attr.name}: {attr.value}
            </div>
          ))}

          <PriceBlock price={variant.prices} />
        </div>

        <div className={styles.productAmount}>
          <QuantityInput quantity={product.quantity} />
          <div className={styles.productTotal}>
            <Typography>Total cost:</Typography>
            <PriceBlock price={[product.price]} />
          </div>
        </div>
      </div>
      <IconButton size="small" className={styles.removeButton}>
        <ClearOutlinedIcon />
      </IconButton>
    </div>
  );
}
