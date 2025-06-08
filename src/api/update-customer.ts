import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { fetchFromApi } from './platformApi';

export const updateCustomer = async (token: string, body: { version: number; actions: MyCustomerUpdateAction[] }) => {
  return await fetchFromApi<Customer>('/me', token, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
