import { ROUTES } from '@/router/routes';
import { Typography } from '@mui/material';
import type { NavigateFunction } from 'react-router';
import styles from '../header.module.scss';

export function Logo({ navigate }: { navigate: NavigateFunction }) {
  return (
    <Typography variant="h5" component={'a'} onClick={() => void navigate(ROUTES.MAIN)} className={styles.logo}>
      UNICKO
    </Typography>
  );
}
