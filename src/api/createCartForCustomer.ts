import { type Address, type Cart } from '@commercetools/platform-sdk';
import { fetchFromApi } from './platformApi';

type CreateCartParams = {
  token: string;
  shippingAddress: Address;
};

export const createCartForCustomer = async (options: CreateCartParams): Promise<Cart> => {
  const body = {
    currency: 'USD',
    shippingAddress: options.shippingAddress,
  };

  return fetchFromApi<Cart>('/me/carts', options.token, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
