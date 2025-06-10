import { useCustomerQuery } from '@/hooks/use-customer-query';
import { ROUTES } from '@/router/routes';
import { mapShippingDetails } from '@/utils/cart-utils';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import styles from './cart-aside.module.scss';
import { CartAsideRow } from './cart-aside-row';

export function CartAside() {
  const { data: customer } = useCustomerQuery();
  const shippingDetails = mapShippingDetails(customer);
  const navigate = useNavigate();

  return (
    <aside className={styles.cartAside}>
      <Typography variant="h4">Shipping Details</Typography>

      {shippingDetails ? (
        <div>
          <CartAsideRow title="Contact Name" info={shippingDetails.name} />
          <CartAsideRow title="Contact Email" info={shippingDetails.name} />

          {shippingDetails.shippingAddress && (
            <div className={styles.addressDetails}>
              <span>Shipping Address:</span>

              {Object.entries(shippingDetails.shippingAddress)
                .filter(([key]) => key !== 'id')
                .map(([key, value]: [string, string]) => (
                  <CartAsideRow key={key} title={key} info={value} />
                ))}
            </div>
          )}
        </div>
      ) : (
        <Typography>No shipping details available</Typography>
      )}

      <Button onClick={() => navigate(`/${ROUTES.ACCOUNT.path}`)}>Update Info</Button>
    </aside>
  );
}
