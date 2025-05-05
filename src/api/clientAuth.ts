import type { Address, CustomerDraft, ErrorResponse } from '@commercetools/platform-sdk';
import { apiRoot, getCustomerApiRoot } from './platformApi.js';
import { mapApiErrorToMessage } from '@/utils/mapApiErrorToMessage.js';

type RegisterCustomerOptions = {
  customerData: CustomerDraft;
  address?: Address;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
};

const registerCustomer = async ({
  customerData,
  address,
  isDefaultShipping = false,
  isDefaultBilling = false,
}: RegisterCustomerOptions) => {
  try {
    const addresses = address ? [address] : [];

    const body: CustomerDraft = {
      ...customerData,
      addresses,
      defaultShippingAddress: isDefaultShipping ? 0 : undefined,
      defaultBillingAddress: isDefaultBilling ? 0 : undefined,
    };

    const response = await apiRoot
      .customers()
      .post({
        body,
      })
      .execute();

    console.log('Customer registered');

    return response.body;
  } catch (error) {
    mapApiErrorToMessage(error as ErrorResponse);
  }
};

const loginCustomer = async (email: string, password: string) => {
  try {
    const api = getCustomerApiRoot(email, password);
    const response = await api.me().get().execute();

    console.log('Customer logged in');

    return {
      customer: response.body,
    };
  } catch (error) {
    mapApiErrorToMessage(error as ErrorResponse);
  }
};

export { registerCustomer, loginCustomer };
