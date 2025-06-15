import { useDiscountQuery } from '@/hooks/use-discount-query';
import { LANG } from '@/utils/constants/filters';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useDiscountCode } from '@/hooks/use-discount-code';
import styles from './promo-bar.module.scss';
import { makePromoString } from '@/utils/make-promo-string';
import clsx from 'clsx';
import { MESSAGES } from '@/utils/constants/messages';

type PromoBarProps = {
  isScrolled: boolean;
};

export function PromoBar({ isScrolled }: PromoBarProps) {
  const { data: discounts } = useDiscountQuery();
  const { copyDiscount } = useDiscountCode();

  if (!discounts || !discounts.length) {
    return;
  }
  const greetingDiscount = discounts[0];
  const repeatedText = makePromoString(greetingDiscount.name[LANG]);

  return (
    <Tooltip
      className={clsx(styles.topBar, { [styles.hidden]: isScrolled })}
      onClick={() => copyDiscount(greetingDiscount.key)}
      title={MESSAGES.PROMO_COPY}
      arrow
    >
      <div className={styles.promoWrapper}>
        <Typography className={styles.promo}>{repeatedText}</Typography>
        <Typography className={styles.promo}>{repeatedText}</Typography>
      </div>
    </Tooltip>
  );
}
