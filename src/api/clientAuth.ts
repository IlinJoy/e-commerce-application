import type { CustomerDraft, ErrorResponse } from '@commercetools/platform-sdk';
import { apiRoot, getCustomerApiRoot } from './platformApi.js';
import { mapApiErrorToMessage } from '@/utils/mapApiErrorToMessage.js';

const registerCustomer = async (customerData: CustomerDraft) => {
  try {
    const response = await apiRoot
      .customers()
      .post({
        body: customerData,
      })
      .execute();

    return response.body;
  } catch (error) {
    mapApiErrorToMessage(error as ErrorResponse);
  }
};

const loginCustomer = async (email: string, password: string) => {
  try {
    const api = getCustomerApiRoot(email, password);
    const response = await api.me().get().execute();

    return {
      customer: response.body,
    };
  } catch (error) {
    mapApiErrorToMessage(error as ErrorResponse);
  }
};

export { registerCustomer, loginCustomer };
