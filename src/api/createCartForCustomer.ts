import { type Address, type Cart } from '@commercetools/platform-sdk';
import { fetchFromApi, getCustomerToken } from './platformApi';

type CreateCartParams = {
  email: string;
  password: string;
  shippingAddress: Address;
};

export const createCartForCustomer = async ({ email, password, shippingAddress }: CreateCartParams): Promise<Cart> => {
  const token = await getCustomerToken(email, password);

  const body = {
    currency: 'USD',
    shippingAddress,
  };

  const result = await fetchFromApi<Cart>('/me/carts', token, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return result;
};
