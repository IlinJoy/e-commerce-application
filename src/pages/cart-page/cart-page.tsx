import { useCartQuery } from '@/hooks/use-cart-query';
import { cookieHandler } from '@/services/cookies/cookie-handler';

export function CartPage() {
  const { data: cart } = useCartQuery();
  console.log(cookieHandler.get('cartId'));
  console.log({ cart });

  return <div>Cart</div>;
}
