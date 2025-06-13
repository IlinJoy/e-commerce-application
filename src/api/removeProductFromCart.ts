import type { Cart, CartUpdateAction } from '@commercetools/platform-sdk';
import { updateCart } from './cart';

type RemoveProductFromCartParams = {
  token: string;
  cartId: string;
  cartVersion: number;
  lineItemId: string;
};

export const removeProductFromCart = async ({
  token,
  cartId,
  cartVersion,
  lineItemId,
}: RemoveProductFromCartParams): Promise<Cart> => {
  const actions: CartUpdateAction[] = [
    {
      action: 'removeLineItem',
      lineItemId: lineItemId,
    },
  ];

  return await updateCart({ token, cartId, cartVersion, actions });
};
