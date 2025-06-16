import { InfoRow } from '../summary/info-row';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import styles from './cart-contact-info.module.scss';
import { ROUTES } from '@/router/routes';
import { useCustomerQuery } from '@/hooks/use-customer-query';
import IconButton from '@mui/material/IconButton';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

export function CustomerInfoBlock() {
  const { data: customer, isLoading } = useCustomerQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Updating Customer Information...</div>;
  }

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.header}>
        <Typography className={styles.heading} component="h2">
          Contact Information
        </Typography>
        <IconButton onClick={() => navigate(`/${ROUTES.ACCOUNT.path}`)}>
          <EditNoteOutlinedIcon />
        </IconButton>
      </div>

      {customer ? (
        <div className={styles.content}>
          <InfoRow title="Contact Name" info={customer.firstName} />
          <InfoRow title="Contact Email" info={customer.email} />
        </div>
      ) : (
        <Typography>No information found. Log in to access your data.</Typography>
      )}
    </div>
  );
}
