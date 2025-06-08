import { CartAside } from '@/components/cart-aside/cart-aside';
import { NothingFound } from '@/components/nothing-found/nothing-found';
import { useCartQuery } from '@/hooks/use-cart-query';

export function CartPage() {
  const { data: cart } = useCartQuery();

  const isEmpty = cart?.lineItems.length === 0;

  return (
    <div>
      <CartAside />
      {isEmpty && <NothingFound />}
    </div>
  );
}
