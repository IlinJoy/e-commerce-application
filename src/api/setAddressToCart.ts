import type { BaseAddress, CartUpdateAction } from '@commercetools/platform-sdk';
import { updateCart } from './cart';
import { getRequestToken } from '@/utils/request-token-handler';

type RemoveProductFromCartParams = {
  cartId: string;
  cartVersion: number;
  address: BaseAddress;
};

export const setShippingAddressToCart = async ({ cartId, cartVersion, address }: RemoveProductFromCartParams) => {
  const token = await getRequestToken();
  const actions: CartUpdateAction[] = [
    {
      action: 'setShippingAddress',
      address,
    },
  ];

  return await updateCart({ token, cartId, cartVersion, actions });
};
