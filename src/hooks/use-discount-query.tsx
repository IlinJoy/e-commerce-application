import { getCardDiscounts } from '@/api/promo';
import { useQuery } from '@tanstack/react-query';

export const useDiscountQuery = () => {
  return useQuery({
    queryKey: ['discounts'],
    queryFn: getCardDiscounts,
  });
};
