import type { CartUpdateAction } from '@commercetools/platform-sdk';
import { apiRoot } from './platformApi';

export const addProductToCart = async ({
  cartId,
  cartVersion,
  productId,
  variantId,
  quantity,
}: {
  cartId: string;
  cartVersion: number;
  productId: string;
  variantId: number;
  quantity: number;
}) => {
  const actions: CartUpdateAction[] = [
    {
      action: 'addLineItem',
      productId,
      variantId,
      quantity,
    },
  ];

  const response = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions,
      },
    })
    .execute();

  return response.body;
};
