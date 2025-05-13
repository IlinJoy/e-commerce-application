import { type CartUpdateAction, type Cart } from '@commercetools/platform-sdk';
import { fetchFromApi } from './platformApi';

type AddProductToCartParams = {
  token: string;
  cartId: string;
  cartVersion: number;
  productId: string;
  variantId: number;
  quantity: number;
};

export const addProductToCart = async (options: AddProductToCartParams): Promise<Cart> => {
  const actions: CartUpdateAction[] = [
    {
      action: 'addLineItem',
      productId: options.productId,
      variantId: options.variantId,
      quantity: options.quantity,
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
