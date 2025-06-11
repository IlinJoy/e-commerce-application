import { getRequestToken } from '@/utils/request-token-handler';
import { fetchFromApi } from './platformApi';
import type { Cart } from '@commercetools/platform-sdk';
import { createCartForCustomer } from './createCartForCustomer';

export const getCart = async () => {
  const token = await getRequestToken();
  return fetchFromApi<Cart>(`/me/active-cart`, token);
};

export const getNewCart = async () => {
  const token = await getRequestToken();
  return await createCartForCustomer(token);
};
