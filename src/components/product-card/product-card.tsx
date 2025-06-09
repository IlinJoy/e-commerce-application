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
import { getOrCreateCart } from '@/api/getOrCreateCart';
import { addProductToCart } from '@/api/addProductToCart';
import { useToken } from '@/context/token-context';
import { removeProductFromCart } from '@/api/removeProductFromCart';
import { useEffect, useState } from 'react';
import { anonCookieHandler } from '@/services/cookies/cookie-handler';
import { useToast } from '@/context/toast-provider';

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

  const [inCart, setInCart] = useState(false);
  const { showToast } = useToast();

  const { token } = useToken();
  const currentToken = token || anonCookieHandler.get();

  useEffect(() => {
    const checkProduct = async () => {
      if (!currentToken) {
        return;
      }

      const cart = await getOrCreateCart(currentToken);
      const isProductInCart = cart.lineItems.some((item) => item.productId === product.id);

      setInCart(isProductInCart);
    };

    checkProduct();
  }, [currentToken, product.id, token]);

  const handleAddToCart = async () => {
    if (!currentToken) {
      return;
    }

    try {
      const cart = await getOrCreateCart(currentToken);

      const updatedCart = await addProductToCart({
        token: currentToken,
        cartId: cart.id,
        cartVersion: cart.version,
        productId: product.id,
        variantId: product.masterVariant.id,
        quantity: 1,
      });

      setInCart(true);
      showToast({ message: 'This product added to cart' });

      //это для удобства, потом удалить
      console.log(`added: ${product.name[LANG]}, items in cart: ${updatedCart.lineItems.length}`);
    } catch {
      showToast({ message: 'Failed to add this product to cart!', isError: true });
    }
  };

  const handleRemoveFromCart = async () => {
    if (!currentToken) {
      return;
    }

    try {
      const cart = await getOrCreateCart(currentToken);

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

      setInCart(false);
      showToast({ message: 'This product removed from cart' });

      //здесь тоже для удобства, позже удалить
      console.log(`deleted: ${lineItemToRemove.name[LANG]}, items in cart: ${updatedCart.lineItems.length}`);
    } catch {
      showToast({ message: 'Failed to remove this product fron cart!', isError: true });
    }
  };

  return (
    <Card className={styles.cardWrapper} variant="outlined">
      <CardActionArea onClick={() => navigate(`/${ROUTES.PRODUCT.base}/${key}`)}>
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
        <Button onClick={handleRemoveFromCart} className={styles.removeBtn}>
          Remove from cart
        </Button>
      )}
    </Card>
  );
}
