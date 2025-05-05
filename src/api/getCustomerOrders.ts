import { apiRoot } from './platformApi';

export const getCustomerOrders = async (customerId: string) => {
  const response = await apiRoot
    .orders()
    .get({
      queryArgs: {
        where: `customerId="${customerId}"`,
      },
    })
    .execute();

  return response.body.results;
};
