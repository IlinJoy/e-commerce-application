import { CartAside } from '@/components/cart-aside/cart-aside';
import { NothingFound } from '@/components/nothing-found/nothing-found';
import { useCartQuery } from '@/hooks/use-cart-query';
import Container from '@mui/material/Container';
import styles from './cart-page.module.scss';

export function CartPage() {
  const { data: cart } = useCartQuery();

  const isEmpty = cart?.lineItems.length === 0;

  return (
    <Container component={'section'} className={styles.cart}>
      <CartAside />
      {isEmpty && <NothingFound />}
    </Container>
  );
}
