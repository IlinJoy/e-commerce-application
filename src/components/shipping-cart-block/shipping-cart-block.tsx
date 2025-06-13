import { ShippingRow } from './shipping-row';

import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './shipping-cart-block.module.scss';
import { ROUTES } from '@/router/routes';
import { useCart } from '@/context/cart-context';
import { useCustomerQuery } from '@/hooks/use-customer-query';

export function ShippingCartBlock() {
  const { cart } = useCart();
  const { data: customer, isLoading } = useCustomerQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Updating Shipping Information...</div>;
  }

  return (
    <div className={styles.shippingBlock}>
      <Typography variant="h4">Shipping Details</Typography>

      {customer ? (
        <div>
          <ShippingRow title="Contact Name" info={customer.firstName} />
          <ShippingRow title="Contact Email" info={customer.email} />

          {cart?.shippingAddress && (
            <div className={styles.addressDetails}>
              <span>Shipping Address:</span>

              {Object.entries(cart.shippingAddress)
                .filter(([key]) => key !== 'id')
                .map(([key, value]: [string, string]) => (
                  <ShippingRow key={key} title={key} info={value} />
                ))}
            </div>
          )}
        </div>
      ) : (
        <Typography>No shipping details available</Typography>
      )}

      <Button onClick={() => navigate(`/${ROUTES.ACCOUNT.path}`)}>Update Info</Button>
    </div>
  );
}
