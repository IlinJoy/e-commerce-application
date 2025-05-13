import type { Order } from '@commercetools/platform-sdk';
import { fetchFromApi } from './platformApi';

type CreateCustomerOrderParams = {
  token: string;
  cartId: string;
  cartVersion: number;
};

export const createOrderFromCart = async ({
  token,
  cartId,
  cartVersion,
}: CreateCustomerOrderParams): Promise<Order> => {
  const body = {
    id: cartId,
    version: cartVersion,
  };

  const result = await fetchFromApi<Order>('/me/orders', token, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return result;
};
