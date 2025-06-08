/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, use, useEffect, useState } from 'react';
import { cookieHandler } from '@/services/cookies/cookie-handler';
import { getNewCartId } from '@/api/cart';

type CartContextType = {
  cartId: string;
};

const CartContext = createContext<CartContextType>({
  cartId: '',
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const cartIdFromCookies = cookieHandler.get('cartId') || '';
  const [cartId, setCartId] = useState(cartIdFromCookies);

  useEffect(() => {
    if (!cartId) {
      const setNewCartId = async () => {
        const newCartId = await getNewCartId();
        cookieHandler.set('cartId', newCartId);
        setCartId(newCartId);
      };
      setNewCartId();
    }
  }, [cartId]);

  return <CartContext.Provider value={{ cartId }}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = use(CartContext);
  if (!context) {
    throw new Error('Must be used within a CartContext.Provider');
  }
  return context;
};
