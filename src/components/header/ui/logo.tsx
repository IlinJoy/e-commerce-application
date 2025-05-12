import { ROUTES } from '@/router/routes';
import Typography from '@mui/material/Typography';
import type { NavigateFunction } from 'react-router';
import styles from '../header.module.scss';

export function Logo({ navigate }: { navigate: NavigateFunction }) {
  return (
    <Typography variant="h5" component={'a'} onClick={() => navigate(ROUTES.MAIN.path)} className={styles.logo}>
      UNICKO
    </Typography>
  );
}
