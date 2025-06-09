import { fetchFromApi } from '@/api/platformApi';
import type { Cart } from '@commercetools/platform-sdk';

export const getOrCreateCart = async (token: string): Promise<Cart> => {
  const existingCart = await getActiveCart(token);

  if (existingCart) {
    return existingCart;
  }

  return await createCart(token);
};

const getActiveCart = async (token: string): Promise<Cart | null> => {
  const response = await fetchFromApi<{ results: Cart[] }>('/me/carts', token);

  return response.results ? response.results[0] : null;
};

const createCart = async (token: string): Promise<Cart> => {
  const cartDraft = {
    currency: 'USD',
  };

  return fetchFromApi<Cart>('/me/carts', token, {
    method: 'POST',
    body: JSON.stringify(cartDraft),
  });
};
