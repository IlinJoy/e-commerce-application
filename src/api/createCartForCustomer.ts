import { apiRoot } from './platformApi.js';

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
  const response = await apiRoot
    .carts()
    .post({
      body: {
        currency: 'USD',
        customerId,
        shippingAddress,
      },
    })
    .execute();

  return response.body;
};
