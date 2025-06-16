import Typography from '@mui/material/Typography';
import styles from './promo-section.module.scss';
import { useDiscountQuery } from '@/hooks/use-discount-query';
import { useDiscountCode } from '@/hooks/use-discount-code';
import { LANG } from '@/utils/constants/filters';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router/routes';
import Container from '@mui/material/Container';
import { getProductKeyFromPredicate } from '@/utils/cart-utils';

export function PromoSection() {
  const { data: discounts } = useDiscountQuery();
  const { copyDiscount, isLoading, getDiscountCode } = useDiscountCode();
  const navigate = useNavigate();

  return (
    <Container component={'section'} className={styles.promo}>
      {discounts?.slice(1).map((discount) => {
        const itemPromo = discount.target?.type === 'lineItems';
        const productKey = itemPromo && getProductKeyFromPredicate(discount.target.predicate);

        return (
          <div key={discount.key} className={styles.promoCard}>
            {discount.requiresDiscountCode ? (
              discount.key && (
                <div onClick={() => copyDiscount(discount.key)} className={styles.label}>
                  <Typography>{isLoading ? '...' : getDiscountCode(discount.key)}</Typography>
                  <ContentCopyOutlinedIcon />
                </div>
              )
            ) : (
              <div onClick={() => navigate(`/${ROUTES.PRODUCT.base}/${productKey}`)} className={styles.label}>
                <Typography>VIEW PRODUCT</Typography>
                <SellOutlinedIcon />
              </div>
            )}

            <div className={styles.description}>
              <Typography variant="h2" className={styles.title}>
                {discount.name[LANG]}
              </Typography>
              <Typography variant="body2">{discount.description?.[LANG]}</Typography>
            </div>
          </div>
        );
      })}
    </Container>
  );
}
