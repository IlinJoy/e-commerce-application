import type { Attribute, Customer } from '@commercetools/platform-sdk';
import { LANG } from './constants/filters';
import { CART_ATTRIBUTES_NAMES } from './constants/ui';

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

type CartAttributes = {
  name: string;
  value: { label?: string; [LANG]: string };
};

const makeFirstLatterUppercase = (string: string) => string[0].toLocaleUpperCase() + string.slice(1);

export const mapCartAttributes = (attributes?: Attribute[]) => {
  return attributes
    ?.filter((attr) => CART_ATTRIBUTES_NAMES.includes(attr.name))
    .map(({ name, value }: CartAttributes) => {
      const attrValue = value.label || value[LANG];
      return { name: makeFirstLatterUppercase(name), value: attrValue };
    });
};
