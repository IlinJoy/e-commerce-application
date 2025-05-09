import type { Address, CustomerDraft } from '@commercetools/platform-sdk';
import type { ErrorResponse } from '@commercetools/platform-sdk';
import { getAdminToken, getCustomerToken, fetchFromApi } from '@/api/platformApi';
import { mapApiErrorToMessage } from '@/utils/mapApiErrorToMessage';

type RegisterCustomerOptions = {
  customerData: Omit<CustomerDraft, 'addresses'>;
  shippingAddress: Address;
  billingAddress?: Address;
  useSameAddress?: boolean;
};

export const registerCustomer = async ({
  customerData,
  shippingAddress,
  billingAddress,
  useSameAddress = false,
}: RegisterCustomerOptions) => {
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

    const token = await getAdminToken();
    const result = await fetchFromApi('/customers', token, {
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
    const token = await getCustomerToken(email, password);
    const result = await fetchFromApi('/me', token);

    console.log('Customer logged in');
    return { customer: result };
  } catch (error) {
    mapApiErrorToMessage(error as ErrorResponse);
  }
};
