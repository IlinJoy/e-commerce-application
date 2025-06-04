import type { AddressFormProps } from '@/components/addresses-block/address-form';
import type { Address, Customer } from '@commercetools/platform-sdk';

export type DefaultValuesProps = { address?: Address; isDefault?: boolean; type: 'ShippingAddress' | 'BillingAddress' };

export const getDefaultValues = ({ address, type, isDefault }: DefaultValuesProps) => ({
  state: address?.state || '',
  streetName: address?.streetName || '',
  postalCode: address?.postalCode || '',
  city: address?.city || '',
  country: (address?.country as 'US' | 'CN') || 'US',
  shippingDefaultAddress: type === 'ShippingAddress' && isDefault,
  billingDefaultAddress: type === 'BillingAddress' && isDefault,
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
