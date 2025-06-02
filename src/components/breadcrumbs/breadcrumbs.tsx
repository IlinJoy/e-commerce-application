import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router';
import styles from './breadcrumbs.module.scss';

export function CatalogBreadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').slice(1);

  return (
    <Breadcrumbs className={styles.breadcrumbs}>
      {segments.map((segment, index) => {
        const last = index === segments.length - 1;

        return last ? (
          <Typography className={styles.last} key={segment}>
            {segment}
          </Typography>
        ) : (
          <Typography
            key={segment}
            className={styles.segment}
            component={Link}
            to={`${segments.slice(1, index + 1).join('/')}`}
          >
            {segment}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}
