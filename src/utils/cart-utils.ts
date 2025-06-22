import type { Attribute, Cart, Customer, LineItem } from '@commercetools/platform-sdk';
import { LANG } from './constants/filters';
import { CART_ATTRIBUTES_NAMES } from './constants/ui';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from './constants/messages';
import type { ToastInfo } from '@/context/toast-provider';

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

export const getItemsAmount = (items: LineItem[] = []) => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

export const mapDiscounts = (cart: Cart | null) =>
  cart?.discountCodes.map((code) => ({
    code: code.discountCode.obj?.code,
    id: code.discountCode.id,
    isVisible: true,
  })) || [];

export const getProductKeyFromPredicate = (predicate: string) => {
  const match = predicate.match(/"(.*?)"/);
  return match?.[1] || '';
};

const getDiscountsDoestMatch = (cart: Cart | null) =>
  cart?.discountCodes.find((code) => code.state !== 'MatchesCart')?.discountCode.obj?.code;

export const composeDiscountMessage = (cart: Cart | null): ToastInfo => {
  const discountDoestMatch = getDiscountsDoestMatch(cart);
  const message = discountDoestMatch
    ? ERROR_MESSAGES.CODE_DOEST_MATCH(discountDoestMatch)
    : SUCCESS_MESSAGES.UPDATE_CART;
  return { message, severity: discountDoestMatch ? 'warning' : 'success' };
};
