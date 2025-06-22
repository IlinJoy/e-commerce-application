import type { Cart, CartUpdateAction } from '@commercetools/platform-sdk';
import { updateCart } from './cart';

type ChangeCardItemQuantityParams = {
  token: string;
  cartId: string;
  cartVersion: number;
  lineItemId: string;
  quantity: number;
};

export const changeCardItemQuantity = async ({
  token,
  cartId,
  cartVersion,
  lineItemId,
  quantity,
}: ChangeCardItemQuantityParams): Promise<Cart> => {
  const actions: CartUpdateAction[] = [
    {
      action: 'changeLineItemQuantity',
      lineItemId: lineItemId,
      quantity,
    },
  ];

  return await updateCart({ token, cartId, cartVersion, actions });
};
