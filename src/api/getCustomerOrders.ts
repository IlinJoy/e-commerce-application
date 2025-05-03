import { ctpClient } from './sdkClient.js';
import { PROJECT_KEY } from '../utils/constants.js';

export const getCustomerOrders = async (customerId: string) => {
  const response = await ctpClient.execute({
    method: 'GET',
    uri: `/${PROJECT_KEY}/orders`,
    queryArgs: {
      where: `customerId="${customerId}"`,
    },
  });

  return response.body.results;
};
