import { ctpClient } from './sdkClient.js';
import { PROJECT_KEY } from '../utils/constants.js';

type CreateCartParams = {
  customerId: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  };
};

export const createCartForCustomer = async ({ customerId, shippingAddress }: CreateCartParams) => {
  const response = await ctpClient.execute({
    method: 'POST',
    uri: `/${PROJECT_KEY}/carts`,
    body: {
      currency: 'USD',
      customerId,
      shippingAddress,
    },
  });

  return response.body;
};
