import { useCustomerQuery } from '@/hooks/use-customer-query';
import { ROUTES } from '@/router/routes';
import { mapShippingDetails } from '@/utils/cart-utils';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import styles from './cart-aside.module.scss';

export function CartAside() {
  const { data: customer } = useCustomerQuery();
  const shippingDetails = mapShippingDetails(customer);
  const navigate = useNavigate();

  const renderField = ([key, value]: [string, string]) => (
    <div key={key}>
      <span>{key}: </span>
      {value}
    </div>
  );

  return (
    <aside className={styles.cartAside}>
      <Typography variant="h4">Shipping Details</Typography>
      {shippingDetails ? (
        <div>
          <div>
            <span>Contact Name:</span> {shippingDetails.name}
          </div>
          <div>
            <span>Contact Email:</span> {shippingDetails.mail}
          </div>

          <div className={styles.addressDetails}>
            <span>Shipping Address:</span>
            {shippingDetails.shippingAddress ? (
              <div>
                {Object.entries(shippingDetails.shippingAddress)
                  .filter(([key]) => key !== 'id')
                  .map(renderField)}
              </div>
            ) : (
              <div>-</div>
            )}
          </div>
        </div>
      ) : (
        <div>No shipping details available</div>
      )}
      <Button onClick={() => navigate(`/${ROUTES.ACCOUNT.path}`)}>Update Info</Button>
    </aside>
  );
}
