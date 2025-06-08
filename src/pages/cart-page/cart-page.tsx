import { useCartQuery } from '@/hooks/use-cart-query';

export function CartPage() {
  const { data: cart } = useCartQuery();
  console.log(cart);

  return <div>Cart</div>;
}
