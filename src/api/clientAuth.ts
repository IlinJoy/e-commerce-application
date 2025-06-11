import type { Address, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import type { ErrorResponse } from '@commercetools/platform-sdk';
import { getCustomerToken, fetchFromApi } from '@/api/platformApi';
import { mapApiErrorToMessage } from '@/utils/mapApiErrorToMessage';
import { getRequestToken } from '@/utils/request-token-handler';

export type RegisterCustomerOptions = {
  customerData: Omit<CustomerDraft, 'addresses'>;
  shippingAddress: Address;
  billingAddress?: Address;
  useSameAddress?: boolean;
  billingDefaultAddress?: boolean;
  shippingDefaultAddress?: boolean;
};

export const registerCustomer = async ({
  customerData,
  shippingAddress,
  billingAddress,
  useSameAddress = false,
  billingDefaultAddress,
  shippingDefaultAddress,
}: RegisterCustomerOptions) => {
  try {
    if (!useSameAddress && !billingAddress) {
      throw new Error('Billing address is required when useSameAddress is false');
    }

    const addresses: Address[] = useSameAddress ? [shippingAddress] : [shippingAddress, billingAddress!];

    const body: CustomerDraft = {
      ...customerData,
      addresses,
      shippingAddresses: [0],
      billingAddresses: [1],
      ...(shippingDefaultAddress && { defaultShippingAddress: 0 }),
      ...(billingDefaultAddress && { defaultBillingAddress: useSameAddress ? 0 : 1 }),
    };
    const token = await getRequestToken();

    const result = await fetchFromApi<CustomerSignInResult>('/me/signup', token, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    console.log('Customer registered');
    return result;
  } catch (error) {
    mapApiErrorToMessage(error as ErrorResponse);
  }
};

export const loginCustomer = async (email: string, password: string) => {
  try {
    const token = await getRequestToken();

    const result = await fetchFromApi<CustomerSignInResult>('/me/login', token, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const customerToken = await getCustomerToken(email, password);
    console.log('Customer logged in');
    return { customer: result, customerToken };
  } catch (error) {
    mapApiErrorToMessage(error as ErrorResponse);
  }
};
