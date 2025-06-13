import { getCartWithoutToken } from '@/api/cart';
import { useCart } from '@/context/cart-context';
import { useToken } from '@/context/token-context';
import { useQuery } from '@tanstack/react-query';

export const useCartQuery = () => {
  const { token } = useToken();
  const { cart } = useCart();

  return useQuery({
    queryKey: ['cart', token],
    queryFn: async () => getCartWithoutToken(),
    enabled: !!cart?.id,
  });
};
