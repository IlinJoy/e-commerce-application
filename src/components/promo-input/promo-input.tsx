import type { AddProductToCartParams } from '@/api/promo';
import { updateDiscountCodes } from '@/api/promo';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/context/toast-provider';
import { getDiscountsDoestMatch, mapDiscounts } from '@/utils/cart-utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/constants/messages';
import type { PromoInput } from '@/validation/promo-validation';
import { promoSchema } from '@/validation/promo-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './promo-input.module.scss';

export type Discount = {
  code?: string;
  id: string;
  isVisible: boolean;
};

export function PromoInput() {
  const { cart, setCart } = useCart();
  const [discounts, setDiscounts] = useState<Discount[]>(mapDiscounts(cart));
  const { showToast } = useToast();

  const {
    register,
    formState: { errors },
    resetField,
    setFocus,
    watch,
    setValue,
  } = useForm<PromoInput>({
    resolver: zodResolver(promoSchema),
    mode: 'all',
  });

  const inputValue = watch('promo');

  const { mutate, isPending } = useMutation({
    mutationFn: updateDiscountCodes,
    onSuccess: (data) => {
      const discountDoestMatch = getDiscountsDoestMatch(data);
      if (discountDoestMatch) {
        showToast({ message: ERROR_MESSAGES.CODE_DOEST_MATCH(discountDoestMatch), isError: true });
      }
      setCart(data);
      setDiscounts(mapDiscounts(data));
      showToast({ message: SUCCESS_MESSAGES.UPDATE_CART });
      resetField('promo');
    },
    onError: (err) => {
      showToast({ message: err.message, isError: true });
    },
  });

  const handleUpdate = (action: AddProductToCartParams['action'], options?: { id: string; code?: string }) => {
    if (cart) {
      mutate({
        cartId: cart.id,
        cartVersion: cart.version,
        discounts: options ? [options] : discounts,
        action,
      });
    }
  };

  const handleAdd = () => {
    const promoCode = discounts.find((discount) => discount.code === inputValue);

    if (inputValue && !promoCode) {
      handleUpdate('add', { code: inputValue, id: '' });
    } else if (promoCode && !promoCode.isVisible) {
      promoCode.isVisible = true;
      resetField('promo');
    } else {
      showToast({ message: ERROR_MESSAGES.PROMO_EXIST, isError: true });
    }
  };

  const handleChipClick = (value: string, index: number) => {
    discounts[index].isVisible = false;
    setValue('promo', value);
    setFocus('promo');
  };

  const handleDelete = (id: string) => {
    handleUpdate('remove', { id });
  };

  const handleReset = () => {
    resetField('promo');
    handleUpdate('remove');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !errors.promo) {
      handleAdd();
    }
  };

  return (
    <div className={styles.promoWrapper}>
      <label htmlFor="promo">Your Promo Codes</label>
      <div className={styles.inputWrapper}>
        {discounts
          ?.filter((discount) => discount.isVisible)
          .map((discount, index) => {
            const code = discount.code;
            if (code) {
              return (
                <Chip
                  key={code}
                  label={code}
                  onClick={() => handleChipClick(code, index)}
                  onDelete={() => handleDelete(discount.id)}
                  variant="outlined"
                  disabled={isPending}
                />
              );
            }
          })}

        <input
          {...register('promo')}
          disabled={isPending}
          onKeyDown={handleKeyDown}
          id="promo"
          placeholder="Enter Code"
        />
      </div>
      {errors && <div>{errors.promo?.message}</div>}
      {inputValue ? (
        <Button variant="text" onClick={handleAdd} disabled={!!errors.promo || isPending}>
          Apply
        </Button>
      ) : (
        <Button variant="text" onClick={handleReset} disabled={!discounts.length || isPending}>
          Remove All Promos
        </Button>
      )}
    </div>
  );
}
