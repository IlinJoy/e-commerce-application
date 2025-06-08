import { getCart } from '@/api/cart';
import { useCart } from '@/context/cart-context';
import { useToken } from '@/context/token-context';
import { useQuery } from '@tanstack/react-query';

export const useCartQuery = () => {
  const { token } = useToken();
  const { cartId } = useCart();

  return useQuery({
    queryKey: ['cart', token],
    queryFn: async () => getCart(cartId),
    enabled: !!cartId,
  });
};
