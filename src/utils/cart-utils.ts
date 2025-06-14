import type { Attribute, Customer, LineItem } from '@commercetools/platform-sdk';
import { LANG } from './constants/filters';
import { CART_ATTRIBUTES_NAMES } from './constants/ui';

export const getShippingAddressForCart = (customer: Customer) => {
  return customer.addresses.find(
    (addr) => addr.id === customer.defaultShippingAddressId || addr.id === customer?.shippingAddressIds?.[0]
  );
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

export const getItemsAmount = (items?: LineItem[]) => {
  if (items) {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }
};
