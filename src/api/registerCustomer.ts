import type { CustomerDraft } from '@commercetools/platform-sdk';
import { apiRoot } from './platformApi';

export const registerCustomer = async (customerData: CustomerDraft) => {
  const response = await apiRoot
    .customers()
    .post({
      body: customerData,
    })
    .execute();

  return response.body;
};
