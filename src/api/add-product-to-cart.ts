import { type CartUpdateAction, type Cart } from '@commercetools/platform-sdk';
import { updateCart } from './cart';

type AddProductToCartParams = {
  token: string;
  cartId: string;
  cartVersion: number;
  productId: string;
  variantId: number;
  quantity: number;
};

export const addProductToCart = async ({
  token,
  cartId,
  cartVersion,
  ...options
}: AddProductToCartParams): Promise<Cart> => {
  const actions: CartUpdateAction[] = [
    {
      action: 'addLineItem',
      productId: options.productId,
      variantId: options.variantId,
      quantity: options.quantity,
    },
  ];

  return await updateCart({ token, cartId, cartVersion, actions });
};
