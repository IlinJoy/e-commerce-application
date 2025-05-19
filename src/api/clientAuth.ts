import type { Address, Customer, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import type { ErrorResponse } from '@commercetools/platform-sdk';
import { getCustomerToken, fetchFromApi } from '@/api/platformApi';
import { mapApiErrorToMessage } from '@/utils/mapApiErrorToMessage';

export type RegisterCustomerOptions = {
  customerData: Omit<CustomerDraft, 'addresses'>;
  shippingAddress: Address;
  billingAddress?: Address;
  useSameAddress?: boolean;
  billingDefaultAddress?: boolean;
  shippingDefaultAddress?: boolean;
};

export const registerCustomer = async (
  token: string,
  { customerData, shippingAddress, billingAddress, useSameAddress = false }: RegisterCustomerOptions
) => {
  try {
    if (!useSameAddress && !billingAddress) {
      throw new Error('Billing address is required when useSameAddress is false');
    }

    const addresses: Address[] = useSameAddress ? [shippingAddress] : [shippingAddress, billingAddress!];

    const body: CustomerDraft = {
      ...customerData,
      addresses,
      defaultShippingAddress: 0,
      defaultBillingAddress: useSameAddress ? 0 : 1,
    };

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

export const fetchLoggedInCustomer = async (email: string, password: string) => {
  try {
    const token = await getCustomerToken(email, password);
    const result = await fetchFromApi<Customer>('/me', token);

    console.log('Customer logged in');
    return { customer: result, customerToken: token };
  } catch (error) {
    mapApiErrorToMessage(error as ErrorResponse);
  }
};
