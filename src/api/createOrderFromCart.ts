import { ctpClient } from './sdkClient.js';
import { PROJECT_KEY } from '../utils/constants.js';

export const createOrderFromCart = async ({
  cartId,
  cartVersion,
}: {
  cartId: string;
  cartVersion: number;
}) => {
  const response = await ctpClient.execute({
    method: 'POST',
    uri: `/${PROJECT_KEY}/orders`,
    body: {
      id: cartId,
      version: cartVersion,
    },
  });

  return response.body;
};
