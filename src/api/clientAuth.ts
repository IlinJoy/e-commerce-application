import { CustomerDraft } from '@commercetools/platform-sdk';
import { apiRoot, getCustomerApiRoot } from './platformApi.js';

const registerCustomer = async (customerData: CustomerDraft) => {
  const response = await apiRoot
    .customers()
    .post({
      body: customerData,
    })
    .execute();

  return response.body;
};

const loginCustomer = async (email: string, password: string) => {
  try {
    const api = getCustomerApiRoot(email, password);
    const response = await api
      .me()
      .get()
      .execute();

    return {
      customer: response.body,
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login error');
  }
};

export { registerCustomer, loginCustomer };
