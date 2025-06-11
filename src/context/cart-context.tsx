/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, use, useCallback, useEffect, useState } from 'react';
import { cookieHandler } from '@/services/cookies/cookie-handler';
import { getCart, getNewCart } from '@/api/cart';
import type { Cart, DiscountCode } from '@commercetools/platform-sdk';
import { ERROR_MESSAGES } from '@/utils/constants/messages';
import { LANG } from '@/utils/constants/filters';

type Discount = {
  code: string;
  name?: string;
  id: string;
};

type Discounts = Record<string, Discount>;
type GetCartCallback = () => Promise<Cart>;

type CartContextType = {
  cartId: string;
  resetCart: () => void;
  discounts: Discounts;
  addDiscount: (discountCode: DiscountCode) => void;
};

const CartContext = createContext<CartContextType>({
  cartId: '',
  resetCart: () => {},
  discounts: {},
  addDiscount: () => {},
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const cartIdFromCookies = cookieHandler.get('cartId') || '';
  const [cartId, setCartId] = useState(cartIdFromCookies);
  const [discounts, setDiscounts] = useState<Discounts>({});

  useEffect(() => {
    if (!cartId) {
      const getCurrentCart = async (callback: GetCartCallback) => {
        try {
          const currentCart = await callback();
          setCartId(currentCart.id);
          cookieHandler.set('cartId', currentCart.id);
        } catch {
          console.log(ERROR_MESSAGES.NEW_CART);
          getCurrentCart(getNewCart);
        }
      };
      getCurrentCart(getCart);
    }
  }, [cartId]);

  const resetCart = useCallback(() => {
    setCartId('');
    cookieHandler.delete('cartId');
  }, []);

  const addDiscount = useCallback((discountCode: DiscountCode) => {
    const newDiscount = {
      [discountCode.code]: {
        name: discountCode.name?.[LANG],
        code: discountCode.code,
        id: discountCode.id,
      },
    };
    setDiscounts((prev) => ({ ...prev, ...newDiscount }));
  }, []);

  return <CartContext.Provider value={{ cartId, resetCart, discounts, addDiscount }}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = use(CartContext);
  if (!context) {
    throw new Error('Must be used within a CartContext.Provider');
  }
  return context;
};
