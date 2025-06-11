import { getRequestToken } from '@/utils/request-token-handler';
import { fetchFromApi } from './platformApi';
import type { CartDiscountPagedQueryResponse, DiscountCode } from '@commercetools/platform-sdk';

export const getCardDiscounts = async () => {
  const token = await getRequestToken();
  const result = await fetchFromApi<CartDiscountPagedQueryResponse>('/cart-discounts', token);
  return result.results;
};

export const getDiscountCodeByKey = async (key: string) => {
  const token = await getRequestToken();
  return await fetchFromApi<DiscountCode>(`/discount-codes/key=${key}`, token);
};
