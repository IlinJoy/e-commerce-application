import { mapPrices } from '@/utils/catalog-utils';
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
import { addProductToCart } from '@/api/addProductToCart';
import { removeProductFromCart } from '@/api/removeProductFromCart';
import { useEffect, useState } from 'react';
import { useToast } from '@/context/toast-provider';
import { useCart } from '@/context/cart-context';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { getRequestToken } from '@/utils/request-token-handler';
import CheckIcon from '@mui/icons-material/Check';
import { getCartWithoutToken } from '@/api/cart';
import { cookieHandler } from '@/services/cookies/cookie-handler';

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
  const { itemPrice, hasDiscount, ...discountInfo } = mapPrices(prices);

  const { cart, setCart } = useCart();
  const [inCart, setInCart] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!cart || !cart.lineItems) {
      setInCart(false);
      return;
    }

    const isProductInCart = cart.lineItems.some((item) => item.productId === product.id);
    setInCart(isProductInCart);
  }, [cart, product.id]);

  const handleAddToCart = async () => {
    const currentToken = await getRequestToken();
    let currentCart = cart;

    if (!currentCart) {
      return;
    }

    if (currentCart.anonymousId) {
      cookieHandler.delete('cartId'); //Если зайти в режим инкогнито, надо удалять cartId, т.к. появляется ошибка

      try {
        currentCart = await getCartWithoutToken();
        setCart(currentCart);
      } catch {
        showToast({ message: ERROR_MESSAGES.ADD_PRODUCT_FAIL, isError: true });
        return;
      }
    }

    try {
      const updatedCart = await addProductToCart({
        token: currentToken,
        cartId: currentCart.id,
        cartVersion: currentCart.version,
        productId: product.id,
        variantId: product.masterVariant.id,
        quantity: 1,
      });

      setCart(updatedCart);
      setInCart(true);
      showToast({ message: SUCCESS_MESSAGES.ADD_PRODUCT });

      //TODO это для удобства, потом удалить
      console.log(`added: ${product.name[LANG]}, items in the cart: ${updatedCart.lineItems.length}`);
    } catch {
      showToast({ message: ERROR_MESSAGES.ADD_PRODUCT_FAIL, isError: true });
    }
  };

  const handleRemoveFromCart = async () => {
    if (!cart) {
      return;
    }

    const currentToken = await getRequestToken();

    try {
      const lineItemToRemove = cart.lineItems.find((item) => item.productId === product.id);

      if (!lineItemToRemove) {
        return;
      }

      const updatedCart = await removeProductFromCart({
        token: currentToken,
        cartId: cart.id,
        cartVersion: cart.version,
        lineItemId: lineItemToRemove.id,
      });

      setCart(updatedCart);
      setInCart(false);
      showToast({ message: SUCCESS_MESSAGES.REMOVE_PRODUCT });

      //TODO здесь тоже для удобства, позже удалить
      console.log(`deleted: ${lineItemToRemove.name[LANG]}, items in the cart: ${updatedCart.lineItems.length}`);
    } catch {
      showToast({ message: ERROR_MESSAGES.REMOVE_PRODUCT_FAIL, isError: true });
    }
  };

  return (
    <Card className={styles.cardWrapper} variant="outlined">
      <CardActionArea className={styles.cardActionArea} onClick={() => navigate(`/${ROUTES.PRODUCT.base}/${key}`)}>
        {hasDiscount && (
          <Typography className={styles.discount} component="span">{`-${discountInfo.discountPercent}%`}</Typography>
        )}

        <CardMedia component="img" height="380" image={image?.url} alt={image?.label} />

        <CardContent>
          <HighlightedText text={name[LANG]} isHeading />
          <HighlightedText text={itemDescription} />
          <PriceBlock
            hasDiscount={hasDiscount}
            itemPrice={itemPrice}
            itemDiscountedPrice={discountInfo.itemDiscountedPrice}
          />
        </CardContent>
      </CardActionArea>

      {!inCart ? (
        <Button onClick={handleAddToCart} className={styles.addBtn}>
          Add to cart
        </Button>
      ) : (
        <>
          <div className={styles.inCartWrapper}>
            <CheckIcon className={styles.checkIcon} /> In cart
          </div>
          <Button onClick={handleRemoveFromCart} className={styles.removeBtn}>
            Remove from cart
          </Button>
        </>
      )}
    </Card>
  );
}
