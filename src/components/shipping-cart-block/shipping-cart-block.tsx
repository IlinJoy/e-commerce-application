import { useCustomerQuery } from '@/hooks/use-customer-query';
import { ShippingRow } from './shipping-row';
import { mapShippingDetails } from '@/utils/cart-utils';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './shipping-cart-block.module.scss';
import { ROUTES } from '@/router/routes';

export function ShippingCartBlock() {
  const { data: customer } = useCustomerQuery();
  const shippingDetails = mapShippingDetails(customer);
  const navigate = useNavigate();

  return (
    <div className={styles.shippingBlock}>
      <Typography variant="h4">Shipping Details</Typography>

      {shippingDetails ? (
        <div>
          <ShippingRow title="Contact Name" info={shippingDetails.name} />
          <ShippingRow title="Contact Email" info={shippingDetails.name} />

          {shippingDetails.shippingAddress && (
            <div className={styles.addressDetails}>
              <span>Shipping Address:</span>

              {Object.entries(shippingDetails.shippingAddress)
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
