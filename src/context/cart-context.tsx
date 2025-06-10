/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, use, useCallback, useEffect, useState } from 'react';
import { cookieHandler } from '@/services/cookies/cookie-handler';
import { getCart, getNewCart } from '@/api/cart';
import type { Cart } from '@commercetools/platform-sdk';
import { ERROR_MESSAGES } from '@/utils/constants/messages';

type CartContextType = {
  cartId: string;
  resetCart: () => void;
};
type GetCartCallback = () => Promise<Cart>;

const CartContext = createContext<CartContextType>({
  cartId: '',
  resetCart: () => {},
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const cartIdFromCookies = cookieHandler.get('cartId') || '';
  const [cartId, setCartId] = useState(cartIdFromCookies);

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

  return <CartContext.Provider value={{ cartId, resetCart }}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = use(CartContext);
  if (!context) {
    throw new Error('Must be used within a CartContext.Provider');
  }
  return context;
};
