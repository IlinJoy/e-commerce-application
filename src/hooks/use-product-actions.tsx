import { addProductToCart } from '@/api/add-product-to-cart';
import { getCartWithoutToken } from '@/api/cart';
import { removeProductFromCart } from '@/api/remove-product-from-cart';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/context/toast-provider';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { getRequestToken } from '@/utils/request-token-handler';
import { useCallback, useEffect, useState } from 'react';

export const useProductActions = (productId?: string, variantId?: number) => {
  const { cart, setCart } = useCart();
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!cart || !cart.lineItems) {
      setInCart(false);
      return;
    }

    const isProductInCart = cart.lineItems.some((item) => item.productId === productId);
    setInCart(isProductInCart);
  }, [cart, productId, variantId]);

  const handleAddToCart = useCallback(async () => {
    if (!productId || !variantId) {
      return;
    }

    setLoading(true);
    const currentToken = await getRequestToken();
    let currentCart = cart;

    if (!currentCart) {
      setLoading(false);
      return;
    }

    if (currentCart.anonymousId) {
      try {
        currentCart = await getCartWithoutToken();
        setCart(currentCart);
      } catch {
        showToast({ message: ERROR_MESSAGES.ADD_PRODUCT_FAIL, severity: 'error' });
        return;
      }
    }

    try {
      const updatedCart = await addProductToCart({
        token: currentToken,
        cartId: currentCart.id,
        cartVersion: currentCart.version,
        productId,
        variantId,
        quantity: 1,
      });

      setCart(updatedCart);
      setInCart(true);
      showToast({ message: SUCCESS_MESSAGES.ADD_PRODUCT });
    } catch {
      showToast({ message: ERROR_MESSAGES.ADD_PRODUCT_FAIL, severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [productId, variantId, cart, setCart, showToast]);

  const handleRemoveFromCart = useCallback(async () => {
    if (!cart) {
      return;
    }

    setLoading(true);
    const currentToken = await getRequestToken();

    try {
      const lineItemToRemove = cart.lineItems.find((item) => item.productId === productId);

      if (!lineItemToRemove) {
        setLoading(false);
        return;
      }

      const updatedCart = await removeProductFromCart({
        token: currentToken,
        cartId: cart.id,
        cartVersion: cart.version,
        lineItemId: lineItemToRemove.id,
      });

      setCart(updatedCart);
      setInCart(false);
      showToast({ message: SUCCESS_MESSAGES.REMOVE_PRODUCT });
    } catch {
      showToast({ message: ERROR_MESSAGES.REMOVE_PRODUCT_FAIL, severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [cart, productId, setCart, showToast]);

  return {
    inCart,
    loading,
    handleAddToCart,
    handleRemoveFromCart,
  };
};
