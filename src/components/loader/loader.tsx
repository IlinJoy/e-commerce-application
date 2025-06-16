import CircularProgress from '@mui/material/CircularProgress';
import styles from './loader.module.scss';

export const Loader = () => (
  <div className={styles.loaderWrapper}>
    <CircularProgress color="primary" />
  </div>
);
