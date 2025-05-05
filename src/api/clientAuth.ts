import type { Address, CustomerDraft, ErrorResponse } from '@commercetools/platform-sdk';
import { apiRoot, getCustomerApiRoot } from '@/api/platformApi.js';
import { mapApiErrorToMessage } from '@/utils/mapApiErrorToMessage.js';

type RegisterCustomerOptions = {
  customerData: CustomerDraft;
  shippingAddress: Address;
  billingAddress?: Address;
  useSameAddress?: boolean;
};

const registerCustomer = async ({
  customerData,
  shippingAddress,
  billingAddress,
  useSameAddress = false,
}: RegisterCustomerOptions) => {
  try {
    if (!useSameAddress && !billingAddress) {
      throw new Error('Billing address is required when useSameAddress is false');
    }

    // non-null assertion operator is justified as in the above if statement we check that billingAddress is defined
    const addresses: Address[] = useSameAddress ? [shippingAddress] : [shippingAddress, billingAddress!];

    const body: CustomerDraft = {
      ...customerData,
      addresses,
      defaultShippingAddress: 0,
      defaultBillingAddress: useSameAddress ? 0 : 1,
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
