import { ctpClient } from './sdkClient.js';
import { PROJECT_KEY } from '../utils/constants.js';
import {
  CartUpdateAction,
  ClientRequest,
} from '@commercetools/platform-sdk';

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

  const request: ClientRequest = {
    method: 'POST',
    uri: `/${PROJECT_KEY}/carts/${cartId}`,
    body: {
      version: cartVersion,
      actions,
    },
  };

  const response = await ctpClient.execute(request);
  return response.body;
};
