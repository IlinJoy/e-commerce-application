import { type CartUpdateAction, type Cart } from '@commercetools/platform-sdk';
import { fetchFromApi, getAdminToken } from './platformApi';

type AddProductToCartParams = {
  cartId: string;
  cartVersion: number;
  productId: string;
  variantId: number;
  quantity: number;
};

export const addProductToCart = async ({
  cartId,
  cartVersion,
  productId,
  variantId,
  quantity,
}: AddProductToCartParams): Promise<Cart> => {
  const token = await getAdminToken();

  const actions: CartUpdateAction[] = [
    {
      action: 'addLineItem',
      productId,
      variantId,
      quantity,
    },
  ];

  const body = {
    version: cartVersion,
    actions,
  };

  const updatedCart = await fetchFromApi<Cart>(`/carts/${cartId}`, token, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return updatedCart;
};
