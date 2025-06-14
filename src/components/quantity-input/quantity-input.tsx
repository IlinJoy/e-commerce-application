import Button from '@mui/material/Button';
import styles from './quantity-input.module.scss';

type QuantityInputProps = {
  quantity: number;
  isDisabled: boolean;
};

export function QuantityInput({ quantity, isDisabled }: QuantityInputProps) {
  return (
    <div className={styles.wrapper}>
      <Button className={styles.button} disabled={isDisabled}>
        -
      </Button>
      <span>{quantity}</span>
      <Button disabled={isDisabled}>+</Button>
    </div>
  );
}
