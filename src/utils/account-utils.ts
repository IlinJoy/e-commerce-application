import { Addresses } from '@/validation/registration-validation';
import type { Address, Customer } from '@commercetools/platform-sdk';

export type DefaultValuesProps = { address?: Address; isDefault?: boolean; type: 'Shipping' | 'Billing' };

export const getDefaultValues = ({ address, type, isDefault }: DefaultValuesProps) => ({
  state: address?.state || '',
  streetName: address?.streetName || '',
  postalCode: address?.postalCode || '',
  city: address?.city || '',
  country: (address?.country as 'US' | 'CN') || 'US',
  shippingDefaultAddress: type === 'Shipping' && isDefault,
  billingDefaultAddress: type === 'Billing' && isDefault,
});

export const getAddresses = (data?: Customer) => {
  if (!data) {
    return;
  }
  const { addresses, billingAddressIds, shippingAddressIds } = data;
  const billingAddresses = addresses.filter((addr) => addr.id && billingAddressIds?.includes(addr.id));
  const shippingAddresses = addresses.filter((addr) => addr.id && shippingAddressIds?.includes(addr.id));

  return {
    billingAddresses,
    shippingAddresses,
  };
};

export const findNewAddress = (customer: Customer) =>
  customer?.addresses.find(
    ({ id }) => id && !(customer.billingAddressIds?.includes(id) || customer.shippingAddressIds?.includes(id))
  );
