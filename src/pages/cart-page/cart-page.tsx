import { NothingFound } from '@/components/nothing-found/nothing-found';
import Container from '@mui/material/Container';
import styles from './cart-page.module.scss';
import { CartRow } from '@/components/cart-card/cart-card';
import { CustomerInfoBlock } from '@/components/cart-contact-info/cart-contact-info';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '@/context/cart-context';
import { deleteCart } from '@/api/cart';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/context/toast-provider';
import { MESSAGES, SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { QUANTITY_SETTINGS } from '@/utils/constants/cart';
import { PromoInput } from '../../components/promo-input/promo-input';
import { Summary } from '../../components/summary/summary';
import { getItemsAmount } from '@/utils/cart-utils';
import { Loader } from '@/components/loader/loader';
import { AppDialog } from '@/components/app-dialog/app-dialog';
import { useState } from 'react';

export function CartPage() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { cart, isLoading } = useCart();
  const { resetCart } = useCart();
  const { showToast } = useToast();

  const isEmpty = cart?.lineItems.length === 0;
  const itemsAmount = getItemsAmount(cart?.lineItems);

  const { mutate } = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      resetCart();
      showToast({ message: SUCCESS_MESSAGES.UPDATE_CART });
    },
    onError: (err) => {
      showToast({ message: err.message, severity: 'error' });
    },
  });

  const handleClearCart = () => {
    if (!cart) {
      return;
    }
    mutate({ id: cart.id, version: cart.version });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container component={'section'} className={styles.cart}>
      {isEmpty ? (
        <NothingFound message="Your cart is empty. Let's fix that!" />
      ) : (
        <div className={styles.products}>
          <div className={styles.productsHeading}>
            <Typography variant="h4" component="h1">
              Shopping Cart
            </Typography>
            <Button onClick={() => setIsOpenDialog(true)} variant="text">
              Clear cart
            </Button>
          </div>
          {cart?.lineItems.map((item) => <CartRow key={item.id} product={item} />)}
        </div>
      )}

      <aside className={styles.cartAside}>
        <PromoInput />
        <Summary
          totalPrice={cart?.totalPrice}
          itemsAmount={itemsAmount}
          discountedAmount={cart?.discountOnTotalPrice?.discountedAmount}
        />
        <CustomerInfoBlock />
        <Typography>
          Sorry, we can deliver only {QUANTITY_SETTINGS.max} items per position at the moment. Thank you for
          understanding
        </Typography>
      </aside>

      <AppDialog
        isOpen={isOpenDialog}
        title="Clear Shopping Cart"
        text={MESSAGES.WANT_TO_CLEAR_CART}
        onClose={() => setIsOpenDialog(false)}
        onConfirm={handleClearCart}
      />
    </Container>
  );
}
