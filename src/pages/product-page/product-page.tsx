import { getProductByKey } from '@/api/catalog';
import { useQuery } from '@tanstack/react-query';
import styles from './product-page.module.scss';
import { getProductIdFromUrl } from '@/utils/getProductKeyFromUrl';
import { NotFoundPage } from '../not-found-page/not-found-page';
import Typography from '@mui/material/Typography';
import { ProductImageBlock } from '@/components/product-image-block/product-image-block';
import { PriceBlock } from '@/components/price-block/price-block';
import Button from '@mui/material/Button';
import { Loader } from '@/components/loader/loader';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/context/toast-provider';
import { useEffect, useState } from 'react';
import { getRequestToken } from '@/utils/request-token-handler';
import { cookieHandler } from '@/services/cookies/cookie-handler';
import { getCartWithoutToken } from '@/api/cart';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { addProductToCart } from '@/api/addProductToCart';
import { removeProductFromCart } from '@/api/removeProductFromCart';
import CheckIcon from '@mui/icons-material/Check';

export const ProductPage = () => {
  const id = getProductIdFromUrl() || '';

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return getProductByKey(id);
    },
    enabled: !!id,
    retry: 1,
  });

  const { cart, setCart } = useCart();
  const { showToast } = useToast();
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (!cart || !cart.lineItems) {
      setInCart(false);
      return;
    }

    const isProductInCart = cart.lineItems.some((item) => item.productId === data?.id);
    setInCart(isProductInCart);
  }, [cart, data?.id]);

  const handleAddToCart = async () => {
    if (!data?.id) {
      return;
    }

    const token = await getRequestToken();
    let currentCart = cart;

    if (!currentCart) {
      return;
    }

    if (currentCart.anonymousId) {
      cookieHandler.delete('cartId');
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
        token,
        cartId: currentCart.id,
        cartVersion: currentCart.version,
        productId: data.id,
        variantId: data.masterVariant.id,
        quantity: 1,
      });

      setCart(updatedCart);
      setInCart(true);
      showToast({ message: SUCCESS_MESSAGES.ADD_PRODUCT });
    } catch {
      showToast({ message: ERROR_MESSAGES.ADD_PRODUCT_FAIL, isError: true });
    }
  };

  const handleRemoveFromCart = async () => {
    if (!data?.id) {
      return;
    }

    if (!cart) {
      return;
    }

    const token = await getRequestToken();
    const lineItem = cart.lineItems.find((item) => item.productId === data.id);

    if (!lineItem) {
      return;
    }

    try {
      const updatedCart = await removeProductFromCart({
        token,
        cartId: cart.id,
        cartVersion: cart.version,
        lineItemId: lineItem.id,
      });

      setCart(updatedCart);
      setInCart(false);
      showToast({ message: SUCCESS_MESSAGES.REMOVE_PRODUCT });
    } catch {
      showToast({ message: ERROR_MESSAGES.REMOVE_PRODUCT_FAIL, isError: true });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <NotFoundPage />;
  }

  const images = data?.masterVariant?.images;
  const prices = data?.masterVariant?.prices;

  return (
    <article className={styles.product}>
      {images && <ProductImageBlock images={images} />}
      <div>
        <div className={styles.content}>
          <Typography variant="h4" component="h2">
            {data?.name['en-US']}
          </Typography>
          <PriceBlock price={prices} />
          <Typography className={styles.description}>{data?.description?.['en-US']}</Typography>
        </div>

        <div className={styles.buttonsWrapper}>
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
        </div>
      </div>
    </article>
  );
};
