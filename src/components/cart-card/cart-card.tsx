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
import { useMutation } from '@tanstack/react-query';
import { removeProductFromCart } from '@/api/remove-product-from-cart';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/context/toast-provider';
import { SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { getRequestToken } from '@/utils/request-token-handler';
import { switchPrice } from '@/utils/catalog-utils';

type CartRowProps = {
  product: LineItem;
};

export function CartRow({ product }: CartRowProps) {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { showToast } = useToast();

  const variant = product.variant;
  const cover = variant.images?.[0];
  const attributes = mapCartAttributes(variant.attributes);
  const totalCost = switchPrice(product.totalPrice.centAmount, {});

  const { mutate, isPending } = useMutation({
    mutationFn: removeProductFromCart,
    onSuccess: (data) => {
      setCart(data);
      showToast({ message: SUCCESS_MESSAGES.REMOVE_PRODUCT });
    },
    onError: (err) => {
      showToast({ message: err.message, isError: true });
    },
  });

  const handleRemove = async () => {
    if (!cart) {
      return;
    }
    const token = await getRequestToken();
    mutate({ token, lineItemId: product.id, cartVersion: cart.version, cartId: cart.id });
  };

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
          <QuantityInput lineItemId={product.id} quantity={product.quantity} isDisabled={isPending} />
          <div className={styles.productTotal}>
            <Typography>Total cost:</Typography>
            <div>$ {totalCost}</div>
          </div>
        </div>
      </div>
      <IconButton onClick={() => handleRemove()} disabled={isPending} size="small" className={styles.removeButton}>
        <ClearOutlinedIcon />
      </IconButton>
    </div>
  );
}
