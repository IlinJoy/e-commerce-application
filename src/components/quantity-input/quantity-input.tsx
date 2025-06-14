import Button from '@mui/material/Button';
import styles from './quantity-input.module.scss';
import { useMutation } from '@tanstack/react-query';
import { getRequestToken } from '@/utils/request-token-handler';
import { changeCardItemQuantity } from '@/api/changeCardItemQuantity';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/context/toast-provider';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/utils/constants/messages';
import type { ChangeEvent } from 'react';
import { QUANTITY_SETTINGS } from '@/utils/constants/cart';

type QuantityInputProps = {
  quantity: number;
  lineItemId: string;
  isDisabled: boolean;
};

export function QuantityInput({ quantity, isDisabled, lineItemId }: QuantityInputProps) {
  const { cart, setCart } = useCart();
  const { showToast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: changeCardItemQuantity,
    onSuccess: (data) => {
      setCart(data);
      showToast({ message: SUCCESS_MESSAGES.ADD_PRODUCT });
    },
    onError: (err) => {
      showToast({ message: err.message, isError: true });
    },
  });

  const updateQuantity = async (quantity: number) => {
    if (!cart) {
      return;
    }
    const token = await getRequestToken();
    mutate({ token, lineItemId, cartVersion: cart.version, cartId: cart.id, quantity });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newQuantity = Number(event.target.value);
    newQuantity = Math.max(QUANTITY_SETTINGS.min, newQuantity);

    if (newQuantity > QUANTITY_SETTINGS.max) {
      event.target.value = String(quantity);
      showToast({ message: ERROR_MESSAGES.QUANTITY_LIMIT(newQuantity, QUANTITY_SETTINGS.max), isError: true });
    } else if (newQuantity !== quantity) {
      updateQuantity(newQuantity);
    }
  };

  const handleButtonClick = (value: number) => updateQuantity(quantity + value);
  const shouldDisable = isDisabled || isPending;

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => handleButtonClick(QUANTITY_SETTINGS.decrement)}
        className={styles.button}
        disabled={shouldDisable || quantity <= QUANTITY_SETTINGS.min}
      >
        -
      </Button>
      <div className={styles.inputWrapper}>
        <input value={quantity} type="number" onChange={handleInputChange} disabled={shouldDisable} />
        <span>{quantity}</span>
      </div>
      <Button
        onClick={() => handleButtonClick(QUANTITY_SETTINGS.increment)}
        disabled={shouldDisable || quantity >= QUANTITY_SETTINGS.max}
      >
        +
      </Button>
    </div>
  );
}
