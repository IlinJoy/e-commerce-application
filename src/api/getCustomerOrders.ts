import type { Order } from '@commercetools/platform-sdk';
import { getCustomerToken, fetchFromApi } from './platformApi';

export const getCustomerOrders = async (email: string, password: string): Promise<Order[]> => {
  const token = await getCustomerToken(email, password);

  const result = await fetchFromApi<{ results: Order[] }>('/me/orders', token);

  return result.results;
};
