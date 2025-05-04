import { apiRoot } from './platformApi.js';

export const createOrderFromCart = async ({
  cartId,
  cartVersion,
}: {
  cartId: string;
  cartVersion: number;
}) => {
  const response = await apiRoot
    .orders()
    .post({
      body: {
        id: cartId,
        version: cartVersion,
      },
    })
    .execute();

  return response.body;
};
