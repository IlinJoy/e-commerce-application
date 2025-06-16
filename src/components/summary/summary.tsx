import { InfoRow } from '@/components/summary/info-row';
import { switchPrice } from '@/utils/catalog-utils';
import Typography from '@mui/material/Typography';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import type { CentPrecisionMoney, TypedMoney } from '@commercetools/platform-sdk';
import styles from './summary.module.scss';
import { clsx } from 'clsx';

type SummaryProps = {
  totalPrice?: CentPrecisionMoney;
  discountedAmount?: TypedMoney;
  itemsAmount: number;
};

export function Summary({ totalPrice, discountedAmount, itemsAmount }: SummaryProps) {
  const totalCartPrice = switchPrice(totalPrice?.centAmount, { fractionDigits: totalPrice?.fractionDigits });
  const discountedAmountPrice = switchPrice(discountedAmount?.centAmount, {
    fractionDigits: discountedAmount?.fractionDigits,
  });

  const summaryTotalPrice = discountedAmount ? totalCartPrice + discountedAmountPrice : totalCartPrice;

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <Typography className={styles.heading} component="h2">
          Cart Summary
        </Typography>
        <MonetizationOnOutlinedIcon />
      </div>

      <div>
        <InfoRow title="Items in Order" info={itemsAmount} />
        <InfoRow
          title="Total Price"
          info={`$ ${summaryTotalPrice}`}
          className={clsx({ [styles.discounted]: discountedAmount })}
        />
        {discountedAmount && (
          <>
            <InfoRow title="You Save" info={`$ ${discountedAmountPrice}`} />
            <InfoRow title="Discounted Price" info={`$ ${totalCartPrice}`} />
          </>
        )}
      </div>
    </div>
  );
}
