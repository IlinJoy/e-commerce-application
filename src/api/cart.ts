import { getRequestToken } from '@/utils/request-token-handler';
import { fetchFromApi } from './platformApi';
import type { Cart } from '@commercetools/platform-sdk';
import { createCartForCustomer } from './createCartForCustomer';

export const getCart = async (id: string) => {
  const token = await getRequestToken();
  console.log({ getCart: token, id });
  return fetchFromApi<Cart>(`/me/carts/${id}`, token);
};

export const getNewCartId = async () => {
  const token = await getRequestToken();
  console.log({ getNewCartId: token });
  const cart = await createCartForCustomer(token);
  return cart.id;
};
