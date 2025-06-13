import { getRequestToken } from '@/utils/request-token-handler';
import { fetchFromApi } from './platformApi';
import type { Cart, CartUpdateAction } from '@commercetools/platform-sdk';

export const getCartWithoutToken = async () => {
  const token = await getRequestToken();
  return await getOrCreateCart(token);
};

export const getOrCreateCart = async (token: string): Promise<Cart> => {
  const existingCart = await getActiveCart(token);

  if (existingCart) {
    return existingCart;
  }

  return await createCart(token);
};

const getActiveCart = async (token: string): Promise<Cart | null> => {
  const response = await fetchFromApi<{ results: Cart[] }>('/me/carts', token);

  return response.results[0];
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

type DeleteCartProps = { id: string; version: number };

export const deleteCart = async ({ id, version }: DeleteCartProps) => {
  const token = await getRequestToken();
  return fetchFromApi<Cart>(`/me/carts/${id}?version=${version} `, token, {
    method: 'DELETE',
  });
};

type UpdateCartParams = {
  token: string;
  cartId: string;
  cartVersion: number;
  actions: CartUpdateAction[];
};

export const updateCart = async ({ token, cartId, cartVersion, actions }: UpdateCartParams) => {
  const body = {
    version: cartVersion,
    actions,
  };

  return await fetchFromApi<Cart>(`/me/carts/${cartId}`, token, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
