import Button from '@mui/material/Button';
import styles from './quantity-input.module.scss';

type QuantityInputProps = {
  quantity: number;
};

export function QuantityInput({ quantity }: QuantityInputProps) {
  return (
    <div className={styles.wrapper}>
      <Button className={styles.button}>-</Button>
      <span>{quantity}</span>
      <Button>+</Button>
    </div>
  );
}
