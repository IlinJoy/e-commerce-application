import { ShippingRow } from './shipping-row';

import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './shipping-cart-block.module.scss';
import { ROUTES } from '@/router/routes';
import { useCustomerQuery } from '@/hooks/use-customer-query';

export function CustomerInfoBlock() {
  const { data: customer, isLoading } = useCustomerQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Updating Customer Information...</div>;
  }

  return (
    <div className={styles.shippingBlock}>
      <Typography variant="h4">Customer</Typography>

      {customer ? (
        <div>
          <ShippingRow title="Contact Name" info={customer.firstName} />
          <ShippingRow title="Contact Email" info={customer.email} />
        </div>
      ) : (
        <Typography>No shipping details available</Typography>
      )}

      <Button onClick={() => navigate(`/${ROUTES.ACCOUNT.path}`)}>Update</Button>
    </div>
  );
}
