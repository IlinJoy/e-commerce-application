import { ROUTES } from '@/router/routes';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import styles from './logo.module.scss';

export function Logo() {
  const navigate = useNavigate();
  return (
    <div className={styles.logoWrapper}>
      <Typography variant="h5" component={'a'} onClick={() => navigate(ROUTES.MAIN.path)} className={styles.logo}>
        UNICKO
      </Typography>
    </div>
  );
}
