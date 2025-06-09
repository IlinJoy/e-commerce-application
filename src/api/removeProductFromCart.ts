import type { Cart, CartUpdateAction } from '@commercetools/platform-sdk';
import { fetchFromApi } from './platformApi';

type RemoveProductFromCartParams = {
  token: string;
  cartId: string;
  cartVersion: number;
  lineItemId: string;
};

export const removeProductFromCart = async (options: RemoveProductFromCartParams): Promise<Cart> => {
  const actions: CartUpdateAction[] = [
    {
      action: 'removeLineItem',
      lineItemId: options.lineItemId,
    },
  ];

  const body = {
    version: options.cartVersion,
    actions,
  };

  const updatedCart = await fetchFromApi<Cart>(`/me/carts/${options.cartId}`, options.token, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return updatedCart;
};
