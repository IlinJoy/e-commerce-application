/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, use, useCallback, useEffect, useState } from 'react';
import { getCartWithoutToken } from '@/api/cart';
import { useToast } from './toast-provider';
import type { Cart } from '@commercetools/platform-sdk';
import { ERROR_MESSAGES } from '@/utils/constants/messages';

type CartContextType = {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  resetCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
  resetCart: () => {},
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCartState] = useState<Cart | null>(null);

  const { showToast } = useToast();

  const setCart = useCallback((cart: Cart) => {
    setCartState(cart);
  }, []);

  const resetCart = useCallback(() => {
    setCartState(null);
  }, []);

  useEffect(() => {
    if (!cart) {
      const loadCart = async () => {
        try {
          const currentCart = await getCartWithoutToken();
          setCart(currentCart);
        } catch {
          showToast({ message: ERROR_MESSAGES.CREATE_CART_FAIL, isError: true });
        }
      };
      loadCart();
    }
  }, [cart, setCart, showToast]);

  return <CartContext.Provider value={{ cart, setCart, resetCart }}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = use(CartContext);
  if (!context) {
    throw new Error('Must be used within a CartContext.Provider');
  }
  return context;
};
