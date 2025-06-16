import { getRequestToken } from '@/utils/request-token-handler';
import { fetchFromApi } from './platformApi';
import type {
  CartDiscountPagedQueryResponse,
  CartUpdateAction,
  DiscountCode,
  DiscountCodePagedQueryResponse,
} from '@commercetools/platform-sdk';
import { updateCart } from './cart';
import type { Discount } from '@/components/promo-input/promo-input';

export const getCardDiscounts = async () => {
  const token = await getRequestToken();
  const result = await fetchFromApi<CartDiscountPagedQueryResponse>('/cart-discounts', token);
  return result.results;
};

export const getDiscountCodeByKey = async (key: string) => {
  const token = await getRequestToken();
  return await fetchFromApi<DiscountCode>(`/discount-codes/key=${key}`, token);
};

export const getDiscountCodes = async () => {
  const token = await getRequestToken();
  const result = await fetchFromApi<DiscountCodePagedQueryResponse>(`/discount-codes`, token);
  return result.results;
};

export type AddProductToCartParams = {
  cartId: string;
  cartVersion: number;
  discounts: Omit<Discount, 'isVisible'>[];
  action: 'add' | 'remove';
};

export const updateDiscountCodes = async ({ cartId, cartVersion, discounts, action }: AddProductToCartParams) => {
  const token = await getRequestToken();
  const actions: CartUpdateAction[] = discounts.map((discount) => {
    return action === 'add' && discount.code
      ? {
          action: 'addDiscountCode',
          code: discount.code,
        }
      : {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id: discount.id,
          },
        };
  });
  return await updateCart({ token, cartId, cartVersion, actions });
};
