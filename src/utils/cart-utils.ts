import type { Customer } from '@commercetools/platform-sdk';

export const mapShippingDetails = (customer?: Customer) => {
  if (!customer) {
    return null;
  }

  const shippingAddress = customer.addresses.find(
    (addr) => addr.id === customer.defaultShippingAddressId || addr.id === customer?.shippingAddressIds?.[0]
  );

  return {
    name: customer.firstName,
    mail: customer.email,
    shippingAddress,
  };
};
