import type { Order } from '@commercetools/platform-sdk';
import { fetchFromApi } from './platformApi';

export const getCustomerOrders = async (token: string): Promise<Order[]> => {
  const result = await fetchFromApi<{ results: Order[] }>('/me/orders', token);

  return result.results;
};
