import type { Order } from '@commercetools/platform-sdk';
import { getCustomerToken, fetchFromApi } from './platformApi';

type CreateCustomerOrderParams = {
  cartId: string;
  cartVersion: number;
  email: string;
  password: string;
};

export const createOrderFromCart = async ({
  cartId,
  cartVersion,
  email,
  password,
}: CreateCustomerOrderParams): Promise<Order> => {
  const token = await getCustomerToken(email, password);

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
