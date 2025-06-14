import { NothingFound } from '@/components/nothing-found/nothing-found';
import Container from '@mui/material/Container';
import styles from './cart-page.module.scss';
import { CartRow } from '@/components/cart-card/cart-card';
import { CustomerInfoBlock } from '@/components/shipping-cart-block/shipping-cart-block';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '@/context/cart-context';
import { deleteCart } from '@/api/cart';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/context/toast-provider';
import { SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { QUANTITY_SETTINGS } from '@/utils/constants/cart';

export function CartPage() {
  const { cart, isLoading } = useCart();
  const { resetCart } = useCart();
  const { showToast } = useToast();

  const isEmpty = cart?.lineItems.length === 0;

  const { mutate } = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      resetCart();
      showToast({ message: SUCCESS_MESSAGES.UPDATE_CART });
    },
    onError: (err) => {
      showToast({ message: err.message, isError: true });
    },
  });

  const handleClearCart = (id?: string, version?: number) => {
    if (!id || !version) {
      return;
    }
    mutate({ id, version });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container component={'section'} className={styles.cart}>
      {isEmpty ? (
        <NothingFound />
      ) : (
        <div className={styles.products}>
          <div className={styles.productsHeading}>
            <Typography variant="h4">Shopping Cart</Typography>
            <Button onClick={() => handleClearCart(cart?.id, cart?.version)} variant="text">
              Clear cart
            </Button>
          </div>
          {cart?.lineItems.map((item) => <CartRow key={item.id} product={item} />)}
        </div>
      )}
      <aside className={styles.cartAside}>
        <CustomerInfoBlock />
        <Typography>
          Sorry, we can deliver only {QUANTITY_SETTINGS.max} items per position at the moment. Thank you for
          understanding
        </Typography>
      </aside>
    </Container>
  );
}
