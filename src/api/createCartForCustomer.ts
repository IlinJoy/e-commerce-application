import type { Cart } from '@commercetools/platform-sdk';
import { fetchFromApi } from './platformApi';

export const createCartForCustomer = async (token: string): Promise<Cart> => {
  const body = {
    currency: 'USD',
  };

  return fetchFromApi<Cart>('/me/carts', token, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
